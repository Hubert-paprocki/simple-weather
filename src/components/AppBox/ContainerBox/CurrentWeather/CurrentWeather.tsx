import React from "react";
import { WeatherData } from "../../../../App";
interface CurrentWeatherProps {
  data: WeatherData | null;
}

function CurrentWeather({ data }: CurrentWeatherProps) {
  let weatherClasses = "";

  if (
    data?.current.condition.text &&
    /partly cloudy/i.test(data.current.condition.text)
  ) {
    weatherClasses = "bg-gradient-to-br from-blue-600/80 to-teal-400/70";
  } else if (
    data?.current.condition.text &&
    /sunny/i.test(data.current.condition.text)
  ) {
    weatherClasses = "bg-gradient-to-br from-sky-600/80 to-cyan-300/70";
  }

  return (
    <div
      className={`m-9 p-3 rounded-md text-neutral-100 text-stone-800 ${weatherClasses}`}
    >
      <div className="pb-3">
        <h2 className="font-semibold">Current weather</h2>
        <p className="text-sm">
          {data?.location.localtime.toString().substring(11, 16)}
        </p>
      </div>
      <div className="flex">
        <p className="text-6xl">
          {data?.current.temp_c}
          <sup className="text-4xl">°C</sup>
        </p>
        <p className="ml-6 text-xl font-semibold mt-1.5">
          {data?.current.condition.text}
        </p>
      </div>
      <p>
        Wind {data?.current.wind_kph} km/h Direction {data?.current.wind_dir}
      </p>
      <p>Gust {data?.current.gust_kph} km/h</p>
      <p>Humidity {data?.current.humidity}%</p>
      <p>Pressure</p>
    </div>
  );
}

export default CurrentWeather;
