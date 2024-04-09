import type {
  WeatherDataResponse,
  CoordinateQueryParams,
  Conditions,
} from "../types/defintions";
import type { Request, Response, NextFunction } from "express";

export const getWeatherData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<WeatherDataResponse> => {
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

export const determineConditions = (
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

export const determineTemperature = (temp: number): string => {
  if (temp === undefined || temp === null)
    return "Weather Temperature information not available.";

  return temp >= 290 ? "Hot" : temp <= 280 ? "Cold" : "Moderate";
};
