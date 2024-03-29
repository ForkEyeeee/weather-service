import dotenv from "dotenv";
import type {
  WeatherSummary,
  WeatherDataResponse,
  CoordinateQueryParams,
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

    const summary: WeatherSummary = {
      conditions: {
        main: weather.current.weather[0].main,
        description: weather.current.weather[0].description,
      },
      temperature:
        weather.current.temp >= 290
          ? "Hot"
          : weather.current.temp <= 280
            ? "Cold"
            : "Moderate",
      alerts: weather.alerts ? weather.alerts : null,
    };

    res.json(summary);
  } catch (error) {
    next(error);
  }
};
