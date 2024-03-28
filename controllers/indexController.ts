import type { Request, Response, NextFunction } from "express";
import type { WeatherDataResponse } from "../types/defintions";
import asyncHandler from "express-async-handler";
// import { body, validationResult } from "express-validator";
require("dotenv").config();
import { WeatherSummary } from "../types/defintions";

export const getWeather = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getWeatherData = async (): Promise<WeatherDataResponse> => {
        const { lat, lon } = req.query;

        if (typeof lat !== "string" && typeof lon !== "string") {
          throw new Error("Query params 'lat' and 'long' have to be defined.");
        } else if (typeof lat !== "string") {
          throw new Error("Query param 'lat' has be defined.");
        } else if (typeof lon !== "string") {
          throw new Error("Query param 'lon' has to be defined.");
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
        );
        const result = await response.json();
        return result;
      };

      const weather = await getWeatherData();

      const summary: WeatherSummary = {
        conditions: {
          main: weather.weather[0].main,
          description: weather.weather[0].description,
        },
        tempDescription: {
          description:
            weather.main.temp >= 290
              ? "Hot"
              : weather.main.temp <= 280
                ? "Cold"
                : "Moderate",
        },
      };

      res.json({ summary });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
