import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Encode URL Controller", () => {
  beforeAll(async () => {
  });

  afterAll(async () => {
  });

  it("should be able to encode a new URL", async () => {

    const response = await request(app)
      .post("/encode")
      .send({
        url: "http://www.google.com",
      })

    expect(response.status).toBe(201);
  });
});