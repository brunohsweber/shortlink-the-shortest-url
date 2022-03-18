import request from "supertest";

import { app } from "@shared/infra/http/app";
import { prisma } from "@shared/infra/prisma/prismaClient";

describe("Encode URL Controller", () => {
  beforeAll(async () => {
    await prisma.$connect()

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

  it("should be able to encode a new URL", async () => {

    const response = await request(app)
      .post("/encode")
      .send({
        url: "http://www.google.com",
      })

    expect(response.status).toBe(200);
  });

  it("should be able to return the shortUrl of an already existing URL", async () => {

    const response = await request(app)
      .post("/encode")
      .send({
        url: "http://www.firstregister.com",
      })

    expect(response.status).toBe(200);
  });

  it("should not be able to shorten an invalid URL", async () => {

    const response = await request(app)
      .post("/encode")
      .send({
        url: "http://google.com",
      })

    expect(response.status).toBe(400);
  });
});