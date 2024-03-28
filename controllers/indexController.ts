import type { Request, Response, NextFunction } from "express";
import type { WeatherDataResponse } from "../types/defintions";
import asyncHandler from "express-async-handler";
// import { body, validationResult } from "express-validator";
require("dotenv").config();

export const getWeather = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getWeatherData = async (): Promise<WeatherDataResponse> => {
        const { lat, lon } = req.query;
        if (typeof lat !== "string" || typeof lon !== "string") {
          const err = new Error(
            "Query params 'lat' and 'long' have to be defined"
          );
          throw err;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
        );
        const result = await response.json();
        return result;
      };

      const weather = await getWeatherData();

      res.json({ weather });
    } catch (error) {
      // console.error(error);
      next(error);
    }
  }
);
