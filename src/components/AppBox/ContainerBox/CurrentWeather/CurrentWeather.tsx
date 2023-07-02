import React from "react";
import { WeatherData } from "../../AppBox";
interface CurrentWeatherProps {
  data: WeatherData | null;
}

function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <div className="">
      <h2>Current weather</h2>
      <p>{data?.location.localtime}</p>
      <p>Temperature:{data?.current.temp_c}°C</p>
      <p>
        Wind{data?.current.wind_kph} {data?.current.wind_dir}
      </p>
      <p>Humidity {data?.}</p>
      <p>Visibility</p>
      <p>Pressure</p>
    </div>
  );
}

export default CurrentWeather;
