export interface FormatForecastWeatherModel {
  timezone: string;
  daily: Daily[];
  hourly: Hourly[];
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
}
