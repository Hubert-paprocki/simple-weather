import React from "react";
import { getWeatherIcon } from "../../ForecastWeather/ForecastWeatherTile";
import { weatherBackgroundColor } from "../../CurrentWeather/CurrentWeather";

interface MappedHourlyWeatherData {
  condition: {
    text: string;
  };
  temp_c: number;
  temp_f: number;
  time: string;
}
interface HourlyWeatherTileProps {
  data: MappedHourlyWeatherData;
}

function HourlyWeatherTile({ data }: HourlyWeatherTileProps) {
  let weatherIcon;

  if (data && data.condition && data.condition.text) {
    weatherIcon = getWeatherIcon(data.condition.text);
  }

  return (
    <div
      className={`${weatherBackgroundColor(
        data && data.condition && data.condition.text ? data.condition.text : ""
      )} rounded-md py-4 px-[1.25rem] text-slate-100 flex flex-col text-center font-semibold text-lg`}
    >
      <p>
        {Math.round(data && data.temp_c)}
        <sup>°</sup>
      </p>
      <div className="text-5xl">{weatherIcon}</div>
      <p className="flex">
        {data && data.time ? data.time.substring(10, 16) : ""}
      </p>
    </div>
  );
}

export default HourlyWeatherTile;
