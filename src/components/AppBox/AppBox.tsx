import React, { useState } from "react";
import CurrentWeather from "./ContainerBox/CurrentWeather/CurrentWeather";
import { WeatherData } from "../../App";
interface AppboxProps {
  isLoading: boolean;
  currentWeatherData: WeatherData | null;
}

function Appbox({ isLoading, currentWeatherData }: AppboxProps) {
  return (
    <div className="w-3/4 max-w-5xl bg-slate-50 rounded-md p-7">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CurrentWeather data={currentWeatherData} />
      )}
    </div>
  );
}

export default Appbox;
