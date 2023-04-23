"use client";

import { UilSearch } from "@iconscout/react-unicons";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { CurrentWeatherModel } from "./model/CurrentWeatherModel";
import { FormatCurrentWeatherModel } from "./model/FormatCurrentWeatherModel";
import { ForecastWeatherModel } from "./model/ForecastWeatherModel";
import { FormatForecastWeatherModel } from "./model/FormatForecastWeatherModel";

const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const formatCurrentWeather = (data: CurrentWeatherModel) => {
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

const formatForecastWeather = (data: ForecastWeatherModel) => {
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

export default function Home() {
  const [formatForecastData, setFormatForecastData] =
    useState<FormatForecastWeatherModel>();
  const [formatCurrentData, setFormatCurrentData] =
    useState<FormatCurrentWeatherModel>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: currentData } = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather?lat=11.5564&lon=104.9282&appid=1fa9ff4126d95b8db54f3897a208e91c"
        );

        const { data: forecastData } = await axios.get(
          "https://api.openweathermap.org/data/2.5/onecall?lat=11.5564&lon=104.9282&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric"
        );

        setFormatCurrentData(formatCurrentWeather(currentData));
        setFormatForecastData(formatForecastWeather(forecastData));
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  console.log(formatCurrentData);
  console.log(formatForecastData);

  return (
    <div className="w-full h-screen text-white p-6 bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col">
      <div className="flex justify-between items-center">
        <UilSearch size="30" color="#fff" />
        <h1 className="font-semibold text-lg">Phnom Penh</h1>
        <UilSearch size="30" color="#fff" />
      </div>
      <div className="flex flex-col items-center mt-[100px]">
        <h1 className="text-[150px] relative">
          34<span className="text-[20px] absolute top-[60px]">°C</span>
        </h1>
        <p className="text-lg">Clear</p>
      </div>
      <div className="flex flex-col mt-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="http://openweathermap.org/img/wn/02n@2x.png"
              className="w-[60px]"
              alt="weather-icon"
            />
            <p>Today-Clear</p>
          </div>
          <div>
            <p>37°/26°</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              className="w-[60px]"
              alt="weather-icon"
            />
            <p>Today-Clear</p>
          </div>
          <div>
            <p>37°/26°</p>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">20:00</p>
            <p>34°</p>
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              className="w-[40px]"
              alt="weather-icon"
            />
            <p className="text-[12px] text-gray-400">12.2km/h</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">20:00</p>
            <p>34°</p>
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              className="w-[40px]"
              alt="weather-icon"
            />
            <p className="text-[12px] text-gray-400">12.2km/h</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">20:00</p>
            <p>34°</p>
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              className="w-[40px]"
              alt="weather-icon"
            />
            <p className="text-[12px] text-gray-400">12.2km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
