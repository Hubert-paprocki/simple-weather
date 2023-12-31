import React from "react";
import CurrentWeather from "./ContainerBox/CurrentWeather/CurrentWeather";
import { ForecastWeatherData, WeatherData } from "../../App";
import ForecastWeatherList from "./ContainerBox/ForecastWeather/ForecastWeatherList";

interface AppboxProps {
  currentWeatherData: WeatherData | null;
  forecastWeatherData: ForecastWeatherData | undefined;
}

function Appbox({ currentWeatherData, forecastWeatherData }: AppboxProps) {
  return (
    <div className=" bg-slate-50 lg:rounded-md p-7 flex flex-col">
      <div className="flex flex-col gap-y-6 lg:flex-row">
        <CurrentWeather data={currentWeatherData} />
        {currentWeatherData && (
          <ForecastWeatherList data={forecastWeatherData} />
        )}
      </div>
    </div>
  );
}

export default Appbox;
