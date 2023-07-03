import React from "react";
import CurrentWeather from "./ContainerBox/CurrentWeather/CurrentWeather";
import { WeatherData } from "../../App";

interface AppboxProps {
  currentWeatherData: WeatherData | null;
}

function Appbox({ currentWeatherData }: AppboxProps) {
  return (
    <div className="w-3/4 max-w-5xl bg-slate-50 rounded-md p-7">
      {currentWeatherData && (
        <p className="mb-2 ml-1  text-xl">
          {currentWeatherData.location.name},{" "}
          {currentWeatherData.location.country}
        </p>
      )}
      <CurrentWeather data={currentWeatherData} />
    </div>
  );
}

export default Appbox;
