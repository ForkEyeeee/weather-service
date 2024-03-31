import dotenv from "dotenv";
import type {
  WeatherSummary,
  WeatherDataResponse,
  CoordinateQueryParams,
  Conditions,
} from "../types/defintions";
import type { Request, Response, NextFunction } from "express";
dotenv.config();

export const indexRouteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const getWeatherData = async (): Promise<WeatherDataResponse> => {
    const { lat, lon } = req.query as Partial<CoordinateQueryParams>;

    if (!lat || !lon) {
      res.status(422);
      throw new Error("Query params lat and lon must both be defined.");
    }

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
    const weather: WeatherDataResponse = await getWeatherData();

    const conditions = determineConditions(weather.current.weather[0]);
    const temperature = determineTemperature(weather.current.temp);

    const summary: WeatherSummary = {
      conditions:
        typeof conditions === "string"
          ? conditions
          : {
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
