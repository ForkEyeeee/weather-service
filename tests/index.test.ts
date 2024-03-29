import request from "supertest";
import express from "express";
import { getWeather } from "../controllers/indexController";

const appTest = express();

appTest.use("/", getWeather);

describe("GET /", () => {
  it("should return weather data summary when given valid coords", async () => {
    const response = await request(appTest).get("/?lat=20&lon=40");
    const summary = response.body;

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(summary.conditions.main).toBeDefined();
    expect(summary.conditions.description).toBeDefined();
    expect(summary.temperature).toBeDefined();
  });

  it("should produce the appropiate error message when lat query param is missing", async () => {
    const response = await request(appTest).get("/?lon=40");

    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.status).toEqual(500);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    const errorMessage = "Query param lat must be defined.";
    expect(response.text.includes(errorMessage)).toBe(true);
  });

  it("should produce the appropiate error message when lon query param is missing", async () => {
    const response = await request(appTest).get("/?lat=20");

    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.status).toEqual(500);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    const errorMessage = "Query param lon must be defined.";
    expect(response.text.includes(errorMessage)).toBe(true);
  });

  it("should produce the appropiate error message when lon is out of range", async () => {
    const response = await request(appTest).get("/?lat=20&lon=3000");

    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.status).toEqual(500);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    const errorMessage =
      "Error: Please enter valid coordinates, wrong longitude.";
    expect(response.text.includes(errorMessage)).toBe(true);
  });

  it("should produce the appropiate error message when lat is out of range", async () => {
    const response = await request(appTest).get("/?lat=3000&lon=20");

    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.status).toEqual(500);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    const errorMessage =
      "Error: Please enter valid coordinates, wrong latitude.";
    expect(response.text.includes(errorMessage)).toBe(true);
  });
});
