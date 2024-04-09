import dotenv from "dotenv";
import type { WeatherSummary, WeatherDataResponse } from "../types/defintions";
import type { Request, Response, NextFunction } from "express";
import {
  getWeatherData,
  determineConditions,
  determineTemperature,
} from "../util/weatherUtils";
dotenv.config();

export const weatherController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!process.env.API_KEY) {
      res.status(500);
      throw new Error("Could not find API_KEY from .env");
    }

    const weather: WeatherDataResponse = await getWeatherData(req, res, next);

    const [weatherConditions] = weather.current.weather;
    const temperature = weather.current.temp;

    const conditionsSummary = determineConditions(weatherConditions);
    const temperatureSummary = determineTemperature(temperature);

    const summary: WeatherSummary = {
      conditionsSummary,
      temperatureSummary,
      alerts: "alerts" in weather ? weather.alerts : [],
    };

    res.json(summary);
  } catch (error) {
    next(error);
  }
};
