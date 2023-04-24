"use client";

import { formatForecastWeather, getImgUrlFromCode } from "@/util";
import { UilSearch, UilArrowUp } from "@iconscout/react-unicons";
import axios from "axios";
import useSWR from "swr";
import { ForecastWeatherModel } from "./model/ForecastWeatherModel";
import { useState } from "react";
import SearchInput from "./components/SearchInput";
import SunMoon from "./components/SunMoon";
import ClockLoader from "react-spinners/ClockLoader";
import { FormatForecastWeatherModel } from "./model/FormatForecastWeatherModel";

const fetcher = async (params: any) => {
  const [url, { lat, lon }] = params;

  if (lat === undefined && lon === undefined) {
    let formatForecastData = {} as FormatForecastWeatherModel;
    return { formatForecastData };
  }

  const { data: forecastData } = await axios.get<ForecastWeatherModel>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_APP_ID}&units=metric`
  );

  let formatForecastData = formatForecastWeather(forecastData);

  return { formatForecastData };
};

export default function Home() {
  const [location, setLocation] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [name, setName] = useState("");

  const { data, error } = useSWR(["weather", location], fetcher);
  if (error) return "An error has occured" + error;
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
  const { formatForecastData } = data;

  console.log(location);

  console.log(formatForecastData);

  console.log(Object.keys(formatForecastData).length == 0);

  const getBackgroundImage = (detail: string) => {
    if (detail === "Thunderstorm") return "/thunderstorm.jpg";
    if (detail === "Snow") return "/snow.jpg";
    if (detail === "Rain" || detail === "Drizzle") return "/drizzle.jpg";
    if (detail === "Clouds") return "/cloud.jpg";
    if (detail === "Clear") return "/clear.jpg";
    return "/mist.jpg";
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${getBackgroundImage(
            formatForecastData.current?.weather[0].main || ""
          )}) `,
        }}
        className="w-full h-full text-white p-6 md:px-[150px] lg:px-[200px] bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col"
      >
        <div className="flex justify-between items-center">
          <h1 className={`font-semibold text-lg ${isSearchOpen && "hidden"}`}>
            {name}
          </h1>
          {isSearchOpen ? (
            <SearchInput
              setIsSearchOpen={setIsSearchOpen}
              setLocation={setLocation}
              setName={setName}
            />
          ) : (
            <div onClick={() => setIsSearchOpen(true)}>
              <UilSearch size="30" color="#fff" />
            </div>
          )}
        </div>
        {!name ? (
          <div className="h-screen flex justify-center mt-[150px]">
            <h1 className="text-3xl">Search for location</h1>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mt-[100px]">
              <h1 className="text-[150px] relative">
                {Math.round(formatForecastData.current.temp)}
                <span className="text-[20px] absolute top-[45px]">°C</span>
              </h1>
              <p className="text-lg">
                {formatForecastData.current.weather[0].main}
              </p>
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

              <div className="flex justify-between mt-8 h-fit space-x-8 overflow-y-hidden overflow-x-auto">
                {formatForecastData.hourly.map((hourly, i) => (
                  <div className="flex flex-col items-center">
                    <p className="text-[12px] text-gray-300">{hourly.title}</p>
                    <p>{Math.round(hourly.temp)}°</p>
                    <img
                      src={getImgUrlFromCode(hourly.icon)}
                      className="w-[40px]"
                      alt="weather-icon"
                    />
                    <div className="flex items-center">
                      <div
                        style={{ transform: `rotate(${hourly.wind_deg}deg)` }}
                      >
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
                  {formatForecastData.current.sunrise &&
                    formatForecastData.current.sunset && (
                      <SunMoon
                        sunrise={formatForecastData.current.sunrise}
                        sunset={formatForecastData.current.sunset}
                        timezone={formatForecastData.timezone}
                        current={formatForecastData.current.dt}
                      />
                    )}
                </div>

                <div className="mt-5 flex">
                  <div className="w-1/2">
                    <p className="text-[12px]">Feel like</p>
                    <p>{Math.round(formatForecastData.current.feels_like)}°C</p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-[12px]">Humidity</p>
                    <p>{formatForecastData.current.humidity}%</p>
                  </div>
                </div>
                <div className="mt-5 flex">
                  <div className="w-1/2">
                    <p className="text-[12px]">Chance of rain</p>
                    <p>31%</p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-[12px]">Pressure</p>
                    <p>{formatForecastData.current.pressure}mbar</p>
                  </div>
                </div>
                <div className="mt-5 flex">
                  <div className="w-1/2">
                    <p className="text-[12px]">Wind speed</p>
                    <p>{formatForecastData.current.wind_speed}km/h</p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-[12px]">UV Index</p>
                    <p>{formatForecastData.current.uvi}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
