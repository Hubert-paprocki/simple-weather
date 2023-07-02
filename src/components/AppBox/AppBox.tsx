import React, { useState, useRef } from "react";
import SearchBar from "./ContainerBox/SearchBar";
import CurrentWeather from "./ContainerBox/CurrentWeather/CurrentWeather";

export interface WeatherData {
  location: {
    localtime: Date;
  };
  current: {
    temp_c: number;
    temp_f: number;
    is_day: number;
    wind_mph: number;
    wind_kph: number;
    feelslike_c: number;
    feelslike_f: number;
    wind_dir: string;
    condition: {
      text: string;
    };
  };
}

function Appbox() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const citySearchRef = useRef<HTMLInputElement>(null);

  const days = 3;
  const fetchWeatherData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${citySearchRef.current?.value}&days=${days}&aqi=no&alerts=no`;
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } else {
        console.error(
          "Failed to fetch weather data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentWeatherData = weatherData
    ? {
        location: {
          localtime: weatherData.location.localtime,
        },
        current: {
          temp_c: weatherData.current.temp_c,
          temp_f: weatherData.current.temp_f,
          is_day: weatherData.current.is_day,
          wind_mph: weatherData.current.wind_mph,
          wind_kph: weatherData.current.wind_kph,
          feelslike_c: weatherData.current.feelslike_c,
          feelslike_f: weatherData.current.feelslike_f,
          wind_dir: weatherData.current.wind_dir,
          condition: {
            text: weatherData.current.condition.text,
          },
        },
      }
    : null;

  return (
    <div className="w-3/4 max-w-5xl bg-slate-200 rounded-md p-7">
      <SearchBar
        searchRef={citySearchRef}
        fetchWeatherData={fetchWeatherData}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CurrentWeather data={currentWeatherData} />
      )}
    </div>
  );
}

export default Appbox;
