export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
  status?: number;
}

interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface WeatherSummary {
  conditions: {
    main: string;
    description: string;
  };
  temperature: string;
  alerts?: WeatherAlert[];
}

export interface WeatherDataResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  };
  alerts: WeatherAlert[];
  cod?: string;
  message?: string;
}

export interface CoordinateQueryParams {
  lat: string;
  lon: string;
}
