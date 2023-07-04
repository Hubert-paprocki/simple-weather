import React from "react";
import CurrentWeather from "./ContainerBox/CurrentWeather/CurrentWeather";
import { WeatherData } from "../../App";
import ForecastWeatherList from "./ContainerBox/ForecastWeather/ForecastWeatherList";

interface AppboxProps {
  currentWeatherData: WeatherData | null;
  forecastWeatherData: any;
}

function Appbox({ currentWeatherData, forecastWeatherData }: AppboxProps) {
  return (
    <div className="w-3/4 max-w-5xl bg-slate-50 rounded-md p-7 flex flex-col">
      {currentWeatherData && (
        <p className="mb-2 ml-1 text-xl">
          {currentWeatherData.location.name},{" "}
          {currentWeatherData.location.country}
        </p>
      )}
      <div className="flex">
        <CurrentWeather data={currentWeatherData} />
        {currentWeatherData && (
          <ForecastWeatherList data={forecastWeatherData} />
        )}
      </div>
    </div>
  );
}

export default Appbox;
