import request from "supertest";
import express from "express";
import { weatherController } from "../controllers/weatherController";
import { weatherQueryValidations } from "../validators/weatherQueryValidations";

const appTest = express();

appTest.use("/", weatherQueryValidations, weatherController);

describe("GET /", () => {
  it("should return weather data summary when given valid coords", async () => {
    const response = await request(appTest).get("/?lat=40&lon=20");
    const summary = response.body;

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(summary.conditionsSummary.main).toBeDefined();
    expect(summary.conditionsSummary.description).toBeDefined();
    expect(summary.temperatureSummary).toBeDefined();
  });

  it("should produce an appropriate error message when query params are not numbers", async () => {
    const response = await request(appTest).get("/?lat=abc&lon=xyz");
    const { errors } = response.body;
    expect(response.status).toEqual(422);

    const errorMessages = [
      "Latitude must be a valid number between -90 and 90.",
      "Longitude must be a valid number between -180 and 180.",
    ];
    expect(errors).toContain(errorMessages[0]);
    expect(errors).toContain(errorMessages[1]);
  });

  it("should produce an appropriate error message when only latitude is provided", async () => {
    const response = await request(appTest).get("/?lat=40");
    const { errors } = response.body;

    expect(response.status).toEqual(422);
    expect(errors).toContain("Longitude must not be empty.");
  });

  it("should produce an appropriate error message when only longitude is provided", async () => {
    const response = await request(appTest).get("/?lon=40");
    const { errors } = response.body;

    expect(response.status).toEqual(422);
    expect(errors).toContain("Latitude must not be empty.");
  });

  it("should produce the appropiate error messages when both lat and lon query params are missing", async () => {
    const response = await request(appTest).get("/");
    const { errors } = response.body;

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(422);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    const errorMessage = [
      "Latitude must not be empty.",
      "Longitude must not be empty.",
    ];
    expect(errors).toContain(errorMessage[0]);
    expect(errors).toContain(errorMessage[1]);
  });

  it("should produce the appropiate error message when lon is out of range", async () => {
    const response = await request(appTest).get("/?lat=20&lon=3000");
    const { errors } = response.body;

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(422);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    expect(errors).toContain(
      "Longitude must be a valid number between -180 and 180."
    );
  });

  it("should produce the appropiate error message when lat is out of range", async () => {
    const response = await request(appTest).get("/?lat=3000&lon=20");
    const { errors } = response.body;

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(422);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    expect(errors).toContain(
      "Latitude must be a valid number between -90 and 90."
    );
  });
});
