export interface FormatForecastWeatherModel {
  timezone: string;
  current: Current;
  daily: Daily[];
  hourly: Hourly[];
}

export interface Current {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Weather[];
  wind_deg: number;
  wind_speed: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Daily {
  title: string;
  temp: number;
  min: number;
  max: number;
  icon: string;
  detail: string;
}

export interface Hourly {
  title: string;
  temp: number;
  icon: string;
  wind_speed: number;
  wind_deg: number;
}
