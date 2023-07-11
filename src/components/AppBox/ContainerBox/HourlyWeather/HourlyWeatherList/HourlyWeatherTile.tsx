import React from "react";
import { getWeatherIcon } from "../../ForecastWeather/ForecastWeatherTile";
import { weatherBackgroundColor } from "../../CurrentWeather/CurrentWeather";
import { HourlyWeatherData } from "./HourlyWeatherList";

interface HourlyWeatherTileProps {
  hourlyWeather: HourlyWeatherData;
}

function HourlyWeatherTile({ hourlyWeather }: HourlyWeatherTileProps) {
  let weatherIcon;

  if (
    hourlyWeather &&
    hourlyWeather.condition &&
    hourlyWeather.condition.text
  ) {
    weatherIcon = getWeatherIcon(hourlyWeather.condition.text);
  }

  return (
    <div
      className={`${weatherBackgroundColor(
        hourlyWeather && hourlyWeather.condition && hourlyWeather.condition.text
          ? hourlyWeather.condition.text
          : ""
      )} rounded-md py-4 px-[1.25rem] text-slate-100 flex flex-col text-center font-semibold text-lg`}
    >
      <p>
        {Math.round(hourlyWeather && hourlyWeather.temp_c)}
        <sup>°</sup>
      </p>
      <div className="text-5xl">{weatherIcon}</div>
      <p className="flex">
        {hourlyWeather && hourlyWeather.time
          ? hourlyWeather.time.substring(10, 16)
          : ""}
      </p>
    </div>
  );
}

export default HourlyWeatherTile;
