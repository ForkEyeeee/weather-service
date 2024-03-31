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

  it("should produce the appropiate error message when lat and lon query params are missing", async () => {
    const response = await request(appTest).get("/?lon=40");

    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.status).toEqual(422);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    const errorMessage = "Query params lat and lon must be both defined.";
    expect(response.text.includes(errorMessage)).toBe(true);
  });

  it("should produce the appropiate error message when lon is out of range", async () => {
    const response = await request(appTest).get("/?lat=20&lon=3000");

    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.status).toEqual(400);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    const errorMessage = "Error: wrong longitude";
    expect(response.text.includes(errorMessage)).toBe(true);
  });

  it("should produce the appropiate error message when lat is out of range", async () => {
    const response = await request(appTest).get("/?lat=3000&lon=20");

    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.status).toEqual(400);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();

    const errorMessage = "Error: wrong latitude";
    console.log(response.text);
    expect(response.text.includes(errorMessage)).toBe(true);
  });
});
