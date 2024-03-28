const request = require("supertest");
const expressTest = require("express");
const { getWeather } = require("../controllers/indexController");

const appTest = expressTest();

appTest.use("/", getWeather);

describe("GET /", () => {
  it("should return weather data summary when given valid coords", async () => {
    const response = await request(appTest).get("/?lat=20&lon=40");
    const { summary } = response.body;

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(summary.conditions.main).toBeDefined();
    expect(summary.conditions.description).toBeDefined();
    expect(summary.tempDescription.description).toBeDefined();
  });

  it("should produce error when query params are missing", async () => {
    const response = await request(appTest).get("/");

    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.status).toEqual(500);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();
  });
});
