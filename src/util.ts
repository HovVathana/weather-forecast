import { CurrentWeatherModel } from "./app/model/CurrentWeatherModel";
import { ForecastWeatherModel } from "./app/model/ForecastWeatherModel";
import { DateTime } from "luxon";

export const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const formatCurrentWeather = (data: CurrentWeatherModel) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

export const formatForecastWeather = (data: ForecastWeatherModel) => {
  let { timezone, daily: dailyData, hourly: hourlyData } = data;
  let daily = dailyData.slice(1, 6).map((d: any) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      min: d.temp.min,
      max: d.temp.max,
      icon: d.weather[0].icon,
    };
  });

  let hourly = hourlyData.slice(1, 6).map((d: any) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

export const getImgUrlFromCode = (code: string) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;
