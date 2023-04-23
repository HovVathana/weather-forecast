"use client";

import { UilSearch } from "@iconscout/react-unicons";

export default function Home() {
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
