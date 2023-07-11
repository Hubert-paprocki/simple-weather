import React, { useState } from "react";
import Appbox from "./components/AppBox/AppBox";
import SearchBar from "./components/AppBox/ContainerBox/SearchBar";
import HourlyWeatherList from "./components/AppBox/ContainerBox/HourlyWeather/HourlyWeatherList/HourlyWeatherList";
import HourlyWeatherListSwitch from "./components/AppBox/HourlyWeatherSwitch";
import HourlyWeatherChart from "./components/AppBox/ContainerBox/HourlyWeather/HourlyWeatherChart/HourlyWeatherChart";

interface LocationData {
  name: string;
  country: string;
}

interface CurrentWeatherData {
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

export interface ForecastWeatherData {
  forecastday: ForecastDay[];
}

interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  hour: [];
}

interface Hour {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
  };
}

export interface WeatherData {
  location: LocationData;
  current: CurrentWeatherData;
  forecast: ForecastWeatherData;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [displayHourly, setdisplayHourly] = useState<string>("tile");
  const days = 14;

  const fetchLocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherDataWithGeolocation(latitude, longitude);
      });
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  const fetchWeatherData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data: WeatherData = await response.json();
        setWeatherData(data);
        console.log(data);
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

  const fetchWeatherDataWithSearch = (city: string) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no$`;

    fetchWeatherData(apiUrl);
  };

  const fetchWeatherDataWithGeolocation = (lat: number, lon: number) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${days}&aqi=no&alerts=no`;

    fetchWeatherData(apiUrl);
  };

  const displayHourlySwitch = (thing: string) => {
    setdisplayHourly(thing);
  };
  return (
    <div className="h-full min-h-screen w-full flex flex-col lg:items-center lg:justify-center 8 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-200 via-indigo-200 to-sky-200 font-roboto">
      <div className="flex flex-col max-w-5xl w-full gap-y-8">
        <SearchBar
          fetchWeatherDataWithSearch={fetchWeatherDataWithSearch}
          fetchLocationData={fetchLocationData}
        />
        <Appbox
          currentWeatherData={weatherData}
          forecastWeatherData={weatherData?.forecast}
        />
        {displayHourly === "tile" ? (
          <HourlyWeatherList data={weatherData?.forecast} />
        ) : (
          <HourlyWeatherChart data={weatherData?.forecast} />
        )}
        <HourlyWeatherListSwitch
          displayHourlySwitch={displayHourlySwitch}
          activeBtn={displayHourly}
        />
      </div>
    </div>
  );
}

export default App;
