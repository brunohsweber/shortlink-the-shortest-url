import request from "supertest";

import { app } from "@shared/infra/http/app";
import { prisma } from "@shared/infra/prisma/prismaClient";
import { EncodeUrlController } from "./EncodeUrlController";

describe("Encode Url Controller", () => {
  beforeAll(async () => {
    await prisma.$connect()

    await prisma.$transaction([
      prisma.urls.deleteMany({}),
    ])

  });

  afterAll(async () => {
    await prisma.$transaction([
      prisma.urls.deleteMany({}),
    ])

    await prisma.$disconnect()
  });

  it("should be defined", () => {
    expect(EncodeUrlController).toBeDefined();
  });

  it("should be a class", () => {
    expect(typeof EncodeUrlController).toBe("function");
  });

  it("should be able have a method called handle", () => {
    expect(EncodeUrlController.prototype.handle).toBeDefined();
  })

  it("should be able to encode a new url", async () => {

    const response = await request(app)
      .post("/encode")
      .send({
        url: "http://www.google.com",
      })

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("urlEncoded");

    expect.assertions(2);
  });

  it("should not be able to re-encode or overwrite an existing url", async () => {

    const response1 = await request(app)
      .post("/encode")
      .send({
        url: "http://www.firstregister.com",
      })

    const response2 = await request(app)
      .post("/encode")
      .send({
        url: "http://www.firstregister.com",
      })

    expect(response1.status).toBe(200);
    expect(response1.body).toHaveProperty("urlEncoded");
    expect(response2.status).toBe(200);
    expect(response2.body).toHaveProperty("urlEncoded");

    expect(response2.body.urlEncoded).toBe(response1.body.urlEncoded);

    expect.assertions(5);
  });

  it("should not be able to accept an undefined url", async () => {

    const response1 = await request(app)
      .post("/encode")
      .send({
        url: undefined,
      })

    const response2 = await request(app)
      .post("/encode")
      .send()

    expect(response1.status).toBe(400);
    expect(response1.body).toHaveProperty("message");
    expect(response1.body.message).toBe("Url is required!");

    expect(response2.status).toBe(400);
    expect(response2.body).toHaveProperty("message");
    expect(response2.body.message).toBe("Url is required!");

    expect.assertions(6);
  })

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