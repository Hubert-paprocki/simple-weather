import React from "react";
import { WeatherData } from "../../../../App";
import {
  MdEast,
  MdNorth,
  MdNorthEast,
  MdNorthWest,
  MdSouth,
  MdSouthEast,
  MdSouthWest,
  MdWest,
} from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { getWeatherIcon } from "../ForecastWeather/ForecastWeatherTile";
interface CurrentWeatherProps {
  readonly data: WeatherData | null;
}

function CurrentWeather({ data }: CurrentWeatherProps) {
  let weatherClasses = "bg-stone-400";
  let compassArw;
  if (
    data?.current.condition.text &&
    /partly cloudy/i.test(data.current.condition.text)
  ) {
    weatherClasses = "bg-gradient-to-br from-blue-600/80 to-teal-400/70";
  } else if (
    data?.current.condition.text &&
    /(sunny|cloudy|rain|snow)/i.test(data.current.condition.text)
  ) {
    weatherClasses = "bg-gradient-to-br from-sky-600/80 to-cyan-300/70";
  } else if (
    data?.current.condition.text &&
    /clear/i.test(data.current.condition.text)
  ) {
    weatherClasses = "bg-gradient-to-br from-sky-700/80 to-cyan-500/70";
  }

  const windDirections = [
    { direction: "WSW", icon: <MdSouthWest /> },
    { direction: "SW", icon: <MdSouthWest /> },
    { direction: "SSW", icon: <MdSouthWest /> },
    { direction: "S", icon: <MdSouth /> },
    { direction: "SSE", icon: <MdSouthEast /> },
    { direction: "SE", icon: <MdSouthEast /> },
    { direction: "ESE", icon: <MdSouthEast /> },
    { direction: "E", icon: <MdEast /> },
    { direction: "ENE", icon: <MdNorthEast /> },
    { direction: "NE", icon: <MdNorthEast /> },
    { direction: "NNE", icon: <MdNorthEast /> },
    { direction: "N", icon: <MdNorth /> },
    { direction: "NNW", icon: <MdNorthWest /> },
    { direction: "NW", icon: <MdNorthWest /> },
    { direction: "WNW", icon: <MdNorthWest /> },
    { direction: "W", icon: <MdWest /> },
  ];

  const windDir = data?.current.wind_dir || "";
  const windDirObj = windDirections.find((dir) => dir.direction === windDir);
  compassArw = windDirObj ? windDirObj.icon : null;

  const currentTime = new Date().toLocaleTimeString().substring(0, 5);
  let weatherIcon;
  if (data?.current.condition.text) {
    weatherIcon = getWeatherIcon(data.current.condition.text);
  }

  return (
    <div
      className={`p-3 rounded-md text-slate-100 min-w-[60%] ${weatherClasses}`}
    >
      <div className="pb-3">
        <h2 className="font-semibold">Current weather</h2>
        <p className="text-sm">{currentTime}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <p className="text-[5rem] flex items-end mr-6">{weatherIcon}</p>
          <p className="text-6xl">
            {Math.round(data?.current.temp_c ?? 0)}
            <sup className="text-4xl">°C</sup>
          </p>
          <div className="ml-6 mb-5 text-xl font-semibold mt-1.5">
            <p>{data?.current.condition.text}</p>
            <p className="text-sm font-normal">
              perceived temp.{" "}
              <span className="font-semibold">
                {Math.round(data?.current.feelslike_c ?? 0)}°
              </span>
            </p>
          </div>
        </div>
        <p className="mb-5">
          Today {data?.forecast.forecastday.at(0)?.day.condition.text}. The
          maximum temperature will be{" "}
          {Math.round(data?.forecast.forecastday.at(0)?.day.maxtemp_c ?? 0)}
          <sup className="">°C</sup>
        </p>
      </div>
      <div className="flex gap-x-8">
        <div>
          <p className="text-sm">Wind</p>
          <p className="group flex items-center gap-1 font-semibold">
            {Math.round(data?.current.wind_kph ?? 0)} km/h
            <span className="inline-block relative">
              {compassArw}
              <span className="absolute hidden group-hover:block bg-gray-200 px-2 py-1 text-gray-800 text-xs rounded-md -top-8 -left-1/2 ">
                {data?.current.wind_dir}
              </span>
            </span>
            <sup className="group-hover:text-slate-300 -ml-1 text-base">
              <AiOutlineInfoCircle />
            </sup>
          </p>
        </div>
        <div>
          <p className="text-sm">Gust</p>{" "}
          <p className="font-semibold">{data?.current.gust_kph} km/h</p>
        </div>
        <div>
          <p className="text-sm">Humidity</p>
          <p className="font-semibold"> {data?.current.humidity}%</p>
        </div>
        <div>
          <p className="text-sm">Chance of rain</p>
          <p className="font-semibold">
            {data?.forecast.forecastday.at(0)?.day.daily_chance_of_rain}%
          </p>
        </div>
        <div className="">
          {" "}
          <p className="text-sm">UV index max.</p>
          <p className="font-semibold">
            {data?.forecast.forecastday.at(0)?.day.uv}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
