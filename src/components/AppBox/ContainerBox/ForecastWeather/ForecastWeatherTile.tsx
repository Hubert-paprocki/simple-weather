import React from "react";
import * as Icons from "react-icons/wi";
import { weatherBackgroundColor } from "../CurrentWeather/CurrentWeather";

interface MappedForecastWeatherData {
  date: string;
  day: {
    avghumidity: number;
    avgtemp_c: number;
    avgtemp_f: number;
    condition: {
      text: string;
    };
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
  };
}

interface ForecastWeatherTileProps {
  data: MappedForecastWeatherData;
}

export function getWeatherIcon(conditionText: string) {
  const iconMap: { [key: string]: React.ReactElement } = {
    Sunny: <Icons.WiDaySunny />,
    Clear: <Icons.WiDaySunny />,
    "Partly cloudy": <Icons.WiDayCloudy />,
    Cloudy: <Icons.WiCloudy />,
    Overcast: <Icons.WiDaySunnyOvercast />,
    Mist: <Icons.WiDayFog />,
    "Patchy rain possible": <Icons.WiDayRain />,
    "Patchy snow possible": <Icons.WiDaySnow />,
    "Patchy sleet possible": <Icons.WiDaySleet />,
    "Patchy freezing drizzle possible": <Icons.WiDayHail />,
    "Thundery outbreaks possible": <Icons.WiDayThunderstorm />,
    "Blowing snow": <Icons.WiSnowWind />,
    Blizzard: <Icons.WiSnowWind />,
    Fog: <Icons.WiFog />,
    "Freezing fog": <Icons.WiFog />,
    "Patchy light drizzle": <Icons.WiDaySprinkle />,
    "Light drizzle": <Icons.WiDaySprinkle />,
    "Freezing drizzle": <Icons.WiDaySprinkle />,
    "Heavy freezing drizzle": <Icons.WiSprinkle />,
    "Patchy light rain": <Icons.WiDayRain />,
    "Light rain": <Icons.WiDayRain />,
    "Moderate rain at times": <Icons.WiRain />,
    "Moderate rain": <Icons.WiRain />,
    "Heavy rain at times": <Icons.WiRain />,
    "Heavy rain": <Icons.WiRain />,
    "Light freezing rain": <Icons.WiDayHail />,
    "Moderate or heavy freezing rain": <Icons.WiHail />,
    "Light sleet": <Icons.WiDaySleet />,
    "Moderate or heavy sleet": <Icons.WiSleet />,
    "Patchy light snow": <Icons.WiDaySnow />,
    "Light snow": <Icons.WiDaySnow />,
    "Patchy moderate snow": <Icons.WiSnow />,
    "Moderate snow": <Icons.WiSnow />,
    "Patchy heavy snow": <Icons.WiSnow />,
    "Heavy snow": <Icons.WiSnowWind />,
    "Ice pellets": <Icons.WiHail />,
    "Light rain shower": <Icons.WiDayShowers />,
    "Moderate or heavy rain shower": <Icons.WiShowers />,
    "Torrential rain shower": <Icons.WiShowers />,
    "Light sleet showers": <Icons.WiDayRainMix />,
    "Moderate or heavy sleet showers": <Icons.WiRainMix />,
    "Light snow showers": <Icons.WiDaySnow />,
    "Moderate or heavy snow showers": <Icons.WiSnow />,
    "Light showers of ice pellets": <Icons.WiDayHail />,
    "Moderate or heavy showers of ice pellets": <Icons.WiHail />,
    "Patchy light rain with thunder": <Icons.WiDayThunderstorm />,
    "Moderate or heavy rain with thunder": <Icons.WiThunderstorm />,
    "Patchy light snow with thunder": <Icons.WiDaySleetStorm />,
    "Moderate or heavy snow with thunder": <Icons.WiNightSnowThunderstorm />,
  };

  return iconMap[conditionText] || null;
}

function ForecastWeatherTile({ data }: ForecastWeatherTileProps) {
  const weatherIcon = getWeatherIcon(data.day.condition.text);
  const convertedDateStr = data.date.substring(5).split("-");
  return (
    <div className="flex flex-col">
      <p className="mb-2 ml-1 text-xl text-stone-700/80 font-medium">
        {`${convertedDateStr[1]}.${convertedDateStr[0]}`}
      </p>
      <div
        className={`${weatherBackgroundColor(
          data.day.condition.text
        )}w-1/3 h-full bg-blue-400 rounded-md flex flex-col text-3xl text-slate-100 font-semibold px-2`}
      >
        <p className="h-full  flex items-center justify-center">
          {Math.round(data.day.maxtemp_c ?? 0)}
          <sup className="mt-3">°</sup>
        </p>
        <div className="h-full flex items-center justify-center">
          <p className="text-7xl">{weatherIcon}</p>
        </div>
        <p className="h-full flex items-center justify-center">
          {Math.round(data.day.mintemp_c ?? 0)}
          <sup className="mt-3">°</sup>
        </p>
      </div>
    </div>
  );
}

export default ForecastWeatherTile;
