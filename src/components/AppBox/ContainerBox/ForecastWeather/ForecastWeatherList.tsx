import React from "react";
import ForecastWeatherTile from "../ForecastWeather/ForecastWeatherTile";
import { WeatherData } from "../../../../App";

interface ForecastWeatherListProps {
  data: WeatherData;
}

function ForecastWeatherList({ data }: ForecastWeatherListProps) {
  return (
    <div className="flex w-full gap-3 ml-6">
      {data?.forecast.forecastday.slice(1).map((item, index) => (
        <ForecastWeatherTile key={index} data={item} />
      ))}
    </div>
  );
}

export default ForecastWeatherList;
