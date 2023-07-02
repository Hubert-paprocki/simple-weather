import React, { useRef, useState } from "react";
import Appbox from "./components/AppBox/AppBox";
import SearchBar from "./components/AppBox/ContainerBox/SearchBar";
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
    humidity: number;
    gust_kph: number;
    condition: {
      text: string;
    };
  };
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
          humidity: weatherData.current.humidity,
          gust_kph: weatherData.current.gust_kph,
          condition: {
            text: weatherData.current.condition.text,
          },
        },
      }
    : null;

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
  const citySearchRef = useRef<HTMLInputElement>(null);
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-y-8 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-200 via-indigo-200 to-sky-200">
      <SearchBar
        searchRef={citySearchRef}
        fetchWeatherData={fetchWeatherData}
      />
      <Appbox isLoading={isLoading} currentWeatherData={currentWeatherData} />
    </div>
  );
}

export default App;
