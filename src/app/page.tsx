"use client";

import {
  formatCurrentWeather,
  formatForecastWeather,
  getImgUrlFromCode,
} from "@/util";
import { UilSearch, UilArrowUp } from "@iconscout/react-unicons";
import axios from "axios";
import useSWR from "swr";
import { CurrentWeatherModel } from "./model/CurrentWeatherModel";
import { ForecastWeatherModel } from "./model/ForecastWeatherModel";
import { useState } from "react";
import SearchInput from "./components/SearchInput";
import SunMoon from "./components/SunMoon";
import ClockLoader from "react-spinners/ClockLoader";

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

  let uvIndex = forecastData.current.uvi;

  return { formatCurrentData, formatForecastData, uvIndex };
};

export default function Home() {
  const [location, setLocation] = useState({ lat: 35.6762, lon: 139.6503 });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data, error } = useSWR(["weather", location], fetcher);
  if (error) return "An error has occured";
  if (!data)
    return (
      <div className="w-screen h-screen items-center justify-center text-white p-6 bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col">
        <ClockLoader
          color="#fff"
          loading={true}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  const { formatCurrentData, formatForecastData, uvIndex } = data;

  return (
    <div className="w-full h-full text-white p-6 md:px-[150px] lg:px-[200px] bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col">
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
          <span className="text-[20px] absolute top-[45px]">°C</span>
        </h1>
        <p className="text-lg">{formatCurrentData.details}</p>
      </div>
      <div className="flex flex-col mt-[150px]">
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
              <div className="flex items-center">
                <div style={{ transform: `rotate(${hourly.wind_deg}deg)` }}>
                  <UilArrowUp size="15" color="#fff" />
                </div>
                <p className="text-[12px] text-gray-300">
                  {hourly.wind_speed}km/h
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 py-4 px-6 rounded-lg bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg w-full">
          <div className="flex items-center justify-center">
            <SunMoon
              sunrise={formatCurrentData.sunrise}
              sunset={formatCurrentData.sunset}
              timezone={formatForecastData.timezone}
              current={formatCurrentData.dt}
            />
          </div>

          <div className="mt-5 flex">
            <div className="w-1/2">
              <p className="text-[12px]">Feel like</p>
              <p>{Math.round(formatCurrentData.feels_like)}°C</p>
            </div>
            <div className="w-1/2">
              <p className="text-[12px]">Humidity</p>
              <p>{formatCurrentData.humidity}%</p>
            </div>
          </div>
          <div className="mt-5 flex">
            <div className="w-1/2">
              <p className="text-[12px]">Chance of rain</p>
              <p>31%</p>
            </div>
            <div className="w-1/2">
              <p className="text-[12px]">Pressure</p>
              <p>{formatCurrentData.pressure}mbar</p>
            </div>
          </div>
          <div className="mt-5 flex">
            <div className="w-1/2">
              <p className="text-[12px]">Wind speed</p>
              <p>{formatCurrentData.speed}km/h</p>
            </div>
            <div className="w-1/2">
              <p className="text-[12px]">UV Index</p>
              <p>{uvIndex}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
