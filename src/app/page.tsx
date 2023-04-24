"use client";

import {
  formatCurrentWeather,
  formatForecastWeather,
  getImgUrlFromCode,
} from "@/util";
import { UilSearch } from "@iconscout/react-unicons";
import axios from "axios";
import useSWR from "swr";
import { CurrentWeatherModel } from "./model/CurrentWeatherModel";
import { ForecastWeatherModel } from "./model/ForecastWeatherModel";
import { useState } from "react";
import SearchInput from "./components/SearchInput";

const fetcher = async (params: any) => {
  const [url, { lat, lon }] = params;

  const { data: currentData } = await axios.get<CurrentWeatherModel>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric`
  );

  const { data: forecastData } = await axios.get<ForecastWeatherModel>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric`
  );

  let formatCurrentData = formatCurrentWeather(currentData);
  let formatForecastData = formatForecastWeather(forecastData);

  return { formatCurrentData, formatForecastData };
};

export default function Home() {
  const [location, setLocation] = useState({ lat: 11.5564, lon: 104.9282 });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data, error } = useSWR(["weather", location], fetcher);
  if (error) return "An error has occured";
  if (!data) return "Loading";
  const { formatCurrentData, formatForecastData } = data;

  console.log(formatCurrentData);
  console.log(formatForecastData);

  return (
    <div className="w-full h-full text-white p-6 bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className={`font-semibold text-lg ${isSearchOpen && "hidden"}`}>
          {formatCurrentData.name}
        </h1>
        {isSearchOpen ? (
          <SearchInput
            setIsSearchOpen={setIsSearchOpen}
            setLocation={setLocation}
          />
        ) : (
          <div onClick={() => setIsSearchOpen(true)}>
            <UilSearch size="30" color="#fff" />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center mt-[100px]">
        <h1 className="text-[150px] relative">
          {Math.round(formatCurrentData.temp)}
          <span className="text-[20px] absolute top-[60px]">°C</span>
        </h1>
        <p className="text-lg">{formatCurrentData.details}</p>
      </div>
      <div className="flex flex-col mt-12">
        {formatForecastData.daily.map((daily, i) => (
          <div className="flex justify-between items-center" key={i}>
            <div className="flex items-center gap-2">
              <img
                src={getImgUrlFromCode(daily.icon)}
                className="w-[60px]"
                alt="weather-icon"
              />
              <p>
                {daily.title} - {daily.detail}
              </p>
            </div>
            <div>
              <p>
                {Math.round(daily.max)}°/{Math.round(daily.min)}°
              </p>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-8">
          {formatForecastData.hourly.map((hourly, i) => (
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-300">{hourly.title}</p>
              <p>{Math.round(hourly.temp)}°</p>
              <img
                src={getImgUrlFromCode(hourly.icon)}
                className="w-[40px]"
                alt="weather-icon"
              />
              <p className="text-[12px] text-gray-300">
                {hourly.wind_speed}km/h
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
