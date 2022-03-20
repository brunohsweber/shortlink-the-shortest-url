import request from "supertest";

import { app } from "@shared/infra/http/app";
import { prisma } from "@shared/infra/prisma/prismaClient";
import { DecodeUrlController } from "./DecodeUrlController";

describe("Decode Url Controller", () => {
  beforeAll(async () => {
    await prisma.$connect()

    await prisma.$transaction([
      prisma.urls.deleteMany({}),
    ])

    await prisma.urls.create({
      data: {
        url: "http://www.firstregister.com",
        short_url: "http://localhost:3000/12345"
      }
    })
  });

  afterAll(async () => {
    await prisma.$transaction([
      prisma.urls.deleteMany({}),
    ])

    await prisma.$disconnect()
  });

  it("should be defined", () => {
    expect(DecodeUrlController).toBeDefined();
  });

  it("should be a class", () => {
    expect(typeof DecodeUrlController).toBe("function");
  });

  it("should be able have a method called handle", () => {
    expect(DecodeUrlController.prototype.handle).toBeDefined();
  })

  it("should be able to decode an url", async () => {

    const urlEncoded = await request(app)
      .post("/encode")
      .send({
        url: "http://www.google.com.br",
      })

    console.log(urlEncoded.body.urlEncoded)

    const urlDecoded = await request(app)
      .post("/decode")
      .send({
        url: urlEncoded.body.urlEncoded,
      })

    expect(urlDecoded.status).toBe(200);
    expect(urlDecoded.body).toHaveProperty("urlDecoded");
    expect(urlDecoded.body.urlDecoded).toBe("http://www.google.com.br");

    expect.assertions(3);
  });

  it("should not be able to accept an invalid url", async () => {

    const response1 = await request(app).post("/encode").send({ url: "google" })
    const response2 = await request(app).post("/encode").send({ url: "google.com" })
    const response3 = await request(app).post("/encode").send({ url: ".google.com" })
    const response4 = await request(app).post("/encode").send({ url: "ww.google.com" })
    const response5 = await request(app).post("/encode").send({ url: "www.google" })
    const response6 = await request(app).post("/encode").send({ url: "www.google." })
    const response7 = await request(app).post("/encode").send({ url: "www.google.c" })
    const response8 = await request(app).post("/encode").send({ url: "http:/www.google.com" })
    const response9 = await request(app).post("/encode").send({ url: "htp://www.google.com" })
    const response10 = await request(app).post("/encode").send({ url: "ttp://www.google.com" })
    const response11 = await request(app).post("/encode").send({ url: "https://google.com" })
    const response12 = await request(app).post("/encode").send({ url: "htps://www.google.com" })

    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
    expect(response3.status).toBe(400);
    expect(response4.status).toBe(400);
    expect(response5.status).toBe(400);
    expect(response6.status).toBe(400);
    expect(response7.status).toBe(400);
    expect(response8.status).toBe(400);
    expect(response9.status).toBe(400);
    expect(response10.status).toBe(400);
    expect(response11.status).toBe(400);
    expect(response12.status).toBe(400);

    expect.assertions(12);
  });
});