import request from "supertest";

import { app } from "@shared/infra/http/app";
import { prisma } from "@shared/infra/prisma/prismaClient";
import { DecodeUrlController } from "./DecodeUrlController";
import { InvalidUrlToDecodeError } from "@shared/errors/InvalidUrlToDecodeError";
import { UrlIsRequiredError } from "@shared/errors/UrlIsRequiredError";

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

  it("should be able to return a decoded url", async () => {

    const urlEncoded = await request(app)
      .post("/encode")
      .send({
        url: "http://www.google.com.br",
      })

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

  it("should not be able to accept an undefined url", async () => {

    const response1 = await request(app)
      .post("/decode")
      .send({
        url: undefined,
      })

    const response2 = await request(app)
      .post("/decode")
      .send()

    expect(response1.status).toBe(400);
    expect(response1.body).toHaveProperty("message");
    expect(response1.body.message).toBe("Url is required!");

    expect(response2.status).toBe(400);
    expect(response2.body).toHaveProperty("message");
    expect(response2.body.message).toBe("Url is required!");

    expect.assertions(6);
  })

  it("should not be able to accept an invalid url to decode", async () => {

    const response1 = await request(app).post("/decode").send({ url: "http://localhost:3000/123456" })
    const response2 = await request(app).post("/decode").send({ url: "localhost:3000/12345" })
    const response3 = await request(app).post("/decode").send({ url: "www.localhost:3000/1234" })
    const response4 = await request(app).post("/decode").send({ url: "localhost:3000/1234*" })
    const response5 = await request(app).post("/decode").send({ url: "www" })
    const response6 = await request(app).post("/decode").send({ url: "http//localhost:3000/abcde" })
    const response7 = await request(app).post("/decode").send({ url: "https://batata:3000/1" })
    const response8 = await request(app).post("/decode").send({ url: "http://localhost:3001/1234" })
    const response9 = await request(app).post("/decode").send({ url: "kkkk/1234" })
    const response10 = await request(app).post("/decode").send({ url: "www.false/1234" })
    const response11 = await request(app).post("/decode").send({ url: ".com.com.com/1234" })
    const response12 = await request(app).post("/decode").send({ url: "http://localhost:3000/" })

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

  it("should be able to throw 404 error when shortened url doesn't exist", async () => {

    const response = await request(app).post("/decode").send({ url: "http://localhost:3000/12345" })

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Url not found!");

    expect.assertions(3);
  });
});