import type { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
// import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

export const getWeather = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getWeatherData = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=10&lon=20&appid=${process.env.API_KEY}`
        );
        const result = await response.json();
        return result;
      };
      const weather = await getWeatherData();
      res.json({
        data: weather,
      });
    } catch (error) {
      console.error(error);
    }
  }
);
