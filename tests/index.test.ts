const request = require("supertest");
const expressTest = require("express");
const { getWeather } = require("../controllers/indexController");

const appTest = expressTest();

appTest.use("/", getWeather);

describe("GET /", () => {
  it("should return weather data summary when given valid coords", async () => {
    const response = await request(appTest).get("/?lat=20&lon=40");
    const { weather } = response.body;

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(weather.current.weather[0].main).toBeDefined();
    expect(weather.current.weather[0].description).toBeDefined();
    expect(weather.current.temp).toBeDefined();
  });

  it("should produce error when query params are missing", async () => {
    const response = await request(appTest).get("/");

    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.status).toEqual(500);
    expect(response.ok).toBeFalsy();
    expect(response.error).toBeDefined();
  });
});
