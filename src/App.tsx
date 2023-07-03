import React, { useState } from "react";
import Appbox from "./components/AppBox/AppBox";
import SearchBar from "./components/AppBox/ContainerBox/SearchBar";

export interface LocationData {
  name: string;
  country: string;
}

export interface CurrentWeatherData {
  temp_c: number;
  temp_f: number;
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
}

export interface WeatherData {
  location: LocationData;
  current: CurrentWeatherData;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const days = 3;

  const formatWeatherData = (weatherData: WeatherData | null) => {
    if (!weatherData) return null;

    const { location, current } = weatherData;
    const formattedWeatherData: WeatherData = {
      location: {
        name: location.name,
        country: location.country,
      },
      current: {
        temp_c: current.temp_c,
        temp_f: current.temp_f,
        wind_mph: current.wind_mph,
        wind_kph: current.wind_kph,
        feelslike_c: current.feelslike_c,
        feelslike_f: current.feelslike_f,
        wind_dir: current.wind_dir,
        humidity: current.humidity,
        gust_kph: current.gust_kph,
        condition: {
          text: current.condition.text,
        },
      },
    };

    return formattedWeatherData;
  };

  const fetchLocationData = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const url = `https://geocode.xyz/${latitude},${longitude}?json=1&auth=126206648519120234113x107627&language=en`;

            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json();

              fetchWeatherData(data.city);
            } else {
              console.error(
                "Error fetching location data:",
                response.statusText
              );
            }
          } catch (error) {
            console.error("Error fetching location data:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  const fetchWeatherData = async (city: string) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`;

    try {
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
    }
  };

  const currentWeatherData = formatWeatherData(weatherData);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-y-8 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-200 via-indigo-200 to-sky-200">
      <SearchBar
        fetchWeatherData={fetchWeatherData}
        fetchLocationData={fetchLocationData}
      />
      <Appbox currentWeatherData={currentWeatherData} />
    </div>
  );
}

export default App;
