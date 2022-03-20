import { prisma } from "@shared/infra/prisma/prismaClient";
import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Encode Url Controller", () => {
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

  it("should be able to encode a new Url", async () => {

    const response = await request(app)
      .post("/encode")
      .send({
        Url: "http://www.google.com",
      })

    expect(response.status).toBe(200);
  });

  it("should be able to return the encoded Url of an already existing Url", async () => {

    const response1 = await request(app)
      .post("/encode")
      .send({
        Url: "http://www.firstregister.com",
      })

    console.log(response1)

    const response2 = await request(app)
      .post("/encode")
      .send({
        Url: "http://www.firstregister.com",
      })

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
  });


  it("should not be able to accept an invalid Url", async () => {

    const response1 = await request(app).post("/encode").send({ Url: "google" })
    const response2 = await request(app).post("/encode").send({ Url: "google.com" })
    const response3 = await request(app).post("/encode").send({ Url: ".google.com" })
    const response4 = await request(app).post("/encode").send({ Url: "ww.google.com" })
    const response5 = await request(app).post("/encode").send({ Url: "www.google" })
    const response6 = await request(app).post("/encode").send({ Url: "www.google." })
    const response7 = await request(app).post("/encode").send({ Url: "www.google.c" })
    const response8 = await request(app).post("/encode").send({ Url: "http:/www.google.com" })
    const response9 = await request(app).post("/encode").send({ Url: "htp://www.google.com" })
    const response10 = await request(app).post("/encode").send({ Url: "ttp://www.google.com" })
    const response11 = await request(app).post("/encode").send({ Url: "https://google.com" })
    const response12 = await request(app).post("/encode").send({ Url: "htps://www.google.com" })

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