const request = require("supertest");
const expressTest = require("express");
const { getWeather } = require("../controllers/indexController");
const app = expressTest();

app.use("/", getWeather);

describe("GET /", () => {
  it("should return weather data", async () => {
    const response = await request(app).get("/?lat=26&lon=42");
    const { weather } = response.body;

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
    expect(weather.coord.lon).toBeDefined();
    expect(weather.coord.lat).toBeDefined();
    expect(weather.timezone).toBeDefined();
    expect(weather.weather).toBeDefined();
    expect(weather.main).toBeDefined();
    expect(weather.visibility).toBeDefined();
    expect(weather.wind).toBeDefined();
    expect(weather.clouds).toBeDefined();
    expect(weather.dt).toBeDefined();
    expect(weather.sys).toBeDefined();
    expect(weather.id).toBeDefined();
    expect(weather.name).toBeDefined();
    expect(weather.cod).toBeDefined();
  });
});
