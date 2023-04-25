import { useEffect } from "react";
import { Daily, ForecastWeatherModel } from "./app/model/ForecastWeatherModel";
import { DateTime } from "luxon";
import { Current } from "./app/model/ForecastWeatherModel";

export const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const formatForecastWeather = (data: ForecastWeatherModel) => {
  let {
    timezone,
    daily: dailyData,
    hourly: hourlyData,
    current: currentData,
  } = data;

  let current = {
    clouds: currentData.clouds,
    dew_point: currentData.dew_point,
    dt: currentData.dt,
    feels_like: currentData.feels_like,
    humidity: currentData.humidity,
    pressure: currentData.pressure,
    sunrise: currentData.sunrise,
    sunset: currentData.sunset,
    temp: currentData.temp,
    uvi: currentData.uvi,
    visibility: currentData.visibility,
    weather: currentData.weather,
    wind_deg: currentData.wind_deg,
    wind_gust: currentData.wind_gust,
    wind_speed: currentData.wind_speed,
  };

  let daily = dailyData.slice(1, 6).map((d: Daily) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      min: d.temp.min,
      max: d.temp.max,
      icon: d.weather[0].icon,
      detail: d.weather[0].main,
    };
  });

  let hourly = hourlyData.slice(0, 24).map((d: Current) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "T"),
      temp: d.temp,
      icon: d.weather[0].icon,
      wind_speed: d.wind_speed,
      wind_deg: d.wind_deg,
    };
  });

  return { timezone, current, daily, hourly };
};

export const getImgUrlFromCode = (code: string) =>
  `http://openweathermap.org/img/w/${code}.png`;
// `https://openweathermap.org/img/wn/${code}@2x.png`;

export const getBackgroundImage = (detail: string) => {
  if (detail === "Thunderstorm") return "/thunderstorm.jpg";
  if (detail === "Snow") return "/snow.jpg";
  if (detail === "Rain" || detail === "Drizzle") return "/drizzle.jpg";
  if (detail === "Clouds") return "/cloud.jpg";
  if (detail === "Clear") return "/clear.jpg";
  return "/mist.jpg";
};
