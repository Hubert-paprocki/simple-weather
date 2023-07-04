import React from "react";
import { getWeatherIcon } from "../ForecastWeather/ForecastWeatherTile";
interface HourlyWeatherTileProps {
  data: any;
}

function HourlyWeatherTile({ data }: HourlyWeatherTileProps) {
  let weatherIcon;

  if (data.condition.text) {
    weatherIcon = getWeatherIcon(data.condition.text);
  }

  return (
    <div className="bg-blue-400 rounded-md py-4 px-[1.25rem] text-slate-100 flex flex-col text-center font-semibold text-lg">
      <p>
        {Math.round(data.temp_c)}
        <sup>°</sup>
      </p>
      <div className="text-5xl">{weatherIcon}</div>
      <p className="flex">{data.time.substring(10, 16)}</p>
    </div>
  );
}

export default HourlyWeatherTile;
