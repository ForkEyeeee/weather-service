import dotenv from "dotenv";
import type {
  WeatherSummary,
  WeatherDataResponse,
  CoordinateQueryParams,
  Conditions,
} from "../types/defintions";
import type { Request, Response, NextFunction } from "express";
dotenv.config();

export const weatherController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const getWeatherData = async (): Promise<WeatherDataResponse> => {
    const { lat, lon } = req.query as Partial<CoordinateQueryParams>;

    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${process.env.API_KEY}`
    );

    const result: WeatherDataResponse = await response.json();

    if (!response.ok) {
      res.status(Number(result.cod));
      throw new Error(result.message ?? "Failed to fetch weather data");
    }

    return result;
  };

  const determineConditions = (
    conditions: Conditions
  ):
    | {
        main: string;
        description: string;
      }
    | string => {
    if (!conditions.id) return "Weather Condition information not available.";

    return {
      main: conditions.main,
      description: conditions.description,
    };
  };

  const determineTemperature = (temp: number): string => {
    if (temp === undefined || temp === null)
      return "Weather Temperature information not available.";

    return temp >= 290 ? "Hot" : temp <= 280 ? "Cold" : "Moderate";
  };

  try {
    if (!process.env.API_KEY) {
      res.status(500);
      throw new Error("Could not find API_KEY from .env");
    }

    const weather: WeatherDataResponse = await getWeatherData();

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
