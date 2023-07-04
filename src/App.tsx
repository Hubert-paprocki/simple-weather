import React, { useState } from "react";
import Appbox from "./components/AppBox/AppBox";
import SearchBar from "./components/AppBox/ContainerBox/SearchBar";
import HourlyWeatherList from "./components/AppBox/ContainerBox/HourlyWeather/HourlyWeatherList";

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

export interface ForecastWeatherData {
  forecastday: ForecastDay[];
}

export interface ForecastDay {
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

export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

export interface WeatherData {
  location: LocationData;
  current: CurrentWeatherData;
  forecast: ForecastWeatherData;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const days = 14;

  const formatWeatherData = (weatherData: WeatherData | null) => {
    if (!weatherData) return null;

    const { location, current, forecast } = weatherData;
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
      forecast: {
        forecastday: forecast.forecastday,
      },
    };

    return formattedWeatherData;
  };

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
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`;

    fetchWeatherData(apiUrl);
  };

  const fetchWeatherDataWithGeolocation = (lat: number, lon: number) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${days}&aqi=no&alerts=no`;

    fetchWeatherData(apiUrl);
  };

  const currentWeatherData = formatWeatherData(weatherData);
  const forecastWeatherData = formatWeatherData(weatherData);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-y-8 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-200 via-indigo-200 to-sky-200">
      <SearchBar
        fetchWeatherDataWithSearch={fetchWeatherDataWithSearch}
        fetchLocationData={fetchLocationData}
      />
      <Appbox
        currentWeatherData={currentWeatherData}
        forecastWeatherData={forecastWeatherData}
      />
      <HourlyWeatherList data={forecastWeatherData} />
    </div>
  );
}

export default App;
