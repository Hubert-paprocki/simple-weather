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
  data: WeatherData | null;
}

export const weatherBackgroundColor = (
  weatherCondition: string | undefined
) => {
  if (weatherCondition && /partly cloudy/i.test(weatherCondition)) {
    return "bg-gradient-to-br from-blue-700/80 to-teal-600/70";
  } else if (weatherCondition && /(rain|snow)/i.test(weatherCondition)) {
    return "bg-gradient-to-br from-gray-700/80 to-sky-600/70";
  } else if (weatherCondition && /clear|sunny/i.test(weatherCondition)) {
    return "bg-gradient-to-br from-sky-600/80 to-cyan-500/70";
  } else if (weatherCondition && /cloudy/i.test(weatherCondition)) {
    return "bg-gradient-to-br from-gray-800/50 to-sky-700/40";
  }
  return "bg-stone-400";
};

function CurrentWeather({ data }: CurrentWeatherProps) {
  let compassArw;
  let windDirName;
  const windDirections = [
    {
      directionShort: "WSW",
      direction: "West-Southwest",
      icon: <MdSouthWest />,
    },
    { directionShort: "SW", direction: "Southwest", icon: <MdSouthWest /> },
    {
      directionShort: "SSW",
      direction: "South-Southwest",
      icon: <MdSouthWest />,
    },
    { directionShort: "S", direction: "South", icon: <MdSouth /> },
    {
      directionShort: "SSE",
      direction: "South-Southeast",
      icon: <MdSouthEast />,
    },
    { directionShort: "SE", direction: "Southeast", icon: <MdSouthEast /> },
    {
      directionShort: "ESE",
      direction: "East-Southeast",
      icon: <MdSouthEast />,
    },
    { directionShort: "E", direction: "East", icon: <MdEast /> },
    {
      directionShort: "ENE",
      direction: "East-Northeast",
      icon: <MdNorthEast />,
    },
    { directionShort: "NE", direction: "Northeast", icon: <MdNorthEast /> },
    {
      directionShort: "NNE",
      direction: "North-Northeast",
      icon: <MdNorthEast />,
    },
    { directionShort: "N", direction: "North", icon: <MdNorth /> },
    {
      directionShort: "NNW",
      direction: "North-Northwest",
      icon: <MdNorthWest />,
    },
    { directionShort: "NW", direction: "Northwest", icon: <MdNorthWest /> },
    {
      directionShort: "WNW",
      direction: "West-Northwest",
      icon: <MdNorthWest />,
    },
    { directionShort: "W", direction: "West", icon: <MdWest /> },
  ];

  const windDir = data?.current.wind_dir || "";
  const windDirObj = windDirections.find(
    (dir) => dir.directionShort === windDir
  );
  compassArw = windDirObj ? windDirObj.icon : null;
  windDirName = windDirObj ? windDirObj.direction : null;

  const currentTime = new Date().toLocaleTimeString().substring(0, 5);
  let weatherIcon;
  if (data?.current.condition.text) {
    weatherIcon = getWeatherIcon(data.current.condition.text);
  }

  return (
    <div className="flex flex-col min-w-[60%]">
      {data && (
        <p className="mb-2 ml-1 text-xl text-stone-700/80 font-medium">
          {data?.location.name}, {data?.location.country}
        </p>
      )}
      <div
        className={`p-3 rounded-md text-slate-100 ${weatherBackgroundColor(
          data?.current.condition.text
        )}`}
      >
        <div className="pb-3">
          <h1 className="font-semibold">Current weather</h1>
          <p className="text-sm">{currentTime}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <p className="text-[5rem] flex items-end mr-6">{weatherIcon}</p>
            <h2 className="text-6xl">
              {Math.round(data?.current.temp_c ?? 0)}
              <sup className="text-4xl">°C</sup>
            </h2>
            <div className="ml-6 mb-5 text-xl font-semibold mt-1.5">
              <h3>{data?.current.condition.text}</h3>
              <p className="text-sm font-normal">
                perceived temp.{" "}
                <span className="font-semibold">
                  {Math.round(data?.current.feelslike_c ?? 0)}°
                </span>
              </p>
            </div>
          </div>
          <p className="mb-5">
            Today {data?.forecast.forecastday[0]?.day.condition.text}. The
            maximum temperature will be{" "}
            {Math.round(data?.forecast.forecastday[0]?.day.maxtemp_c ?? 0)}
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
                  {windDirName}
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
              {data?.forecast.forecastday[0]?.day.daily_chance_of_rain}%
            </p>
          </div>
          <div className="">
            {" "}
            <p className="text-sm">UV index max.</p>
            <p className="font-semibold">
              {data?.forecast.forecastday[0]?.day.uv}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
