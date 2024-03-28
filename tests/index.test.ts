const request = require("supertest");
const expressTest = require("express");
const { getWeather } = require("../controllers/indexController");

const app = expressTest();

app.use("/", getWeather);

describe("GET /", () => {
  it("should return weather data", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
