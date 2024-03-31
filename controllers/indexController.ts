import dotenv from "dotenv";
import type {
  WeatherSummary,
  WeatherDataResponse,
  CoordinateQueryParams,
  Conditions,
} from "../types/defintions";
import type { Request, Response, NextFunction } from "express";
dotenv.config();

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getWeatherData = async (): Promise<WeatherDataResponse> => {
      const { lat, lon } = req.query as Partial<CoordinateQueryParams>;

      if (!lat) {
        throw new Error("Query param lat must be defined.");
      }

      if (!lon) {
        throw new Error("Query param lon must be defined.");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${process.env.API_KEY}`
      );
      const result = await response.json();
      return result;
    };

    const weather = await getWeatherData();

    if (weather.cod === "400" && weather.message)
      throw new Error(`Please enter valid coordinates, ${weather.message}.`);

    const determineTemperature = (temp: number): string => {
      if (temp === undefined || temp === null)
        return "Weather Temperature information not available.";

      return temp >= 290 ? "Hot" : temp <= 280 ? "Cold" : "Moderate";
    };

    const determineConditions = (
      conditions: Conditions
    ): {
      main: string;
      description: string;
    } => {
      if (!conditions.id) {
        const errorMessage = "Weather Condition information not available.";
        conditions.main = conditions.description = errorMessage;
      }

      return {
        main: conditions.main,
        description: conditions.description,
      };
    };

    const conditions = determineConditions(weather.current.weather[0]);
    const temperature = determineTemperature(weather.current.temp);

    const summary: WeatherSummary = {
      conditions: {
        main: conditions.main,
        description: conditions.description,
      },
      temperature,
      alerts: "alerts" in weather ? weather.alerts : [],
    };

    res.json(summary);
  } catch (error) {
    next(error);
  }
};
