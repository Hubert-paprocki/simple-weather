import React from "react";
import { WeatherData } from "../../../../App";
import * as Icons from "react-icons/wi";

interface ForecastWeatherTileProps {
  data: any;
}

export function getWeatherIcon(conditionText: string) {
  const iconMap: { [key: string]: React.ReactElement } = {
    Clear: <Icons.WiDaySunny />,
    "Partly cloudy": <Icons.WiDayCloudy />,
    Cloudy: <Icons.WiCloudy />,
    Overcast: <Icons.WiDaySunnyOvercast />,
    Mist: <Icons.WiDayFog />,
    Fog: <Icons.WiFog />,
    "Patchy rain possible": <Icons.WiDayRain />,
    "Light drizzle": <Icons.WiDaySprinkle />,
    Drizzle: <Icons.WiDaySprinkle />,
    "Light rain": <Icons.WiDayRain />,
    "Moderate rain": <Icons.WiRain />,
    "Heavy rain": <Icons.WiRain />,
    "Light freezing rain": <Icons.WiDayRainMix />,
    "Moderate freezing rain": <Icons.WiRainMix />,
    "Heavy freezing rain": <Icons.WiRainMix />,
    "Light rain shower": <Icons.WiDayShowers />,
    "Moderate rain shower": <Icons.WiDayShowers />,
    "Torrential rain shower": <Icons.WiShowers />,
    "Patchy light rain with thunder": <Icons.WiStormShowers />,
    "Moderate or heavy rain with thunder": <Icons.WiDayThunderstorm />,
    "Patchy snow possible": <Icons.WiDaySnow />,
    "Light snow": <Icons.WiDaySnow />,
    "Moderate snow": <Icons.WiSnow />,
    "Heavy snow": <Icons.WiSnow />,
    Blizzard: <Icons.WiSnowWind />,
    "Patchy light snow with thunder": <Icons.WiDaySnowThunderstorm />,
    "Moderate or heavy snow with thunder": <Icons.WiStormShowers />,
    "Patchy sleet possible": <Icons.WiDaySleet />,
    "Patchy light sleet": <Icons.WiDaySleet />,
    "Light sleet": <Icons.WiDaySleet />,
    "Moderate or heavy sleet": <Icons.WiSleet />,
    "Patchy light snow and sleet": <Icons.WiDaySleet />,
    "Light snow and sleet": <Icons.WiDaySleet />,
    "Moderate or heavy snow and sleet": <Icons.WiSprinkle />,
    "Patchy freezing drizzle possible": <Icons.WiDayHail />,
    "Light freezing drizzle": <Icons.WiDayHail />,
    "Moderate or heavy freezing drizzle": <Icons.WiHail />,
    "Thundery outbreaks possible": <Icons.WiThunderstorm />,
    "Blowing dust": <Icons.WiDust />,
    "Blowing sand": <Icons.WiSandstorm />,
    "Blowing snow": <Icons.WiSnowWind />,
    "Blowing spray": <Icons.WiDust />,
    Tornado: <Icons.WiTornado />,
  };

  return iconMap[conditionText] || null;
}

function ForecastWeatherTile({ data }: ForecastWeatherTileProps) {
  const weatherIcon = getWeatherIcon(data.day.condition.text);

  return (
    <div className="w-1/3 h-full bg-blue-400 rounded-md flex flex-col text-3xl text-slate-100 font-semibold">
      <p className="h-full  flex items-center justify-center">
        {data.day.maxtemp_c}
        <sup className="mt-3">°</sup>
      </p>
      <div className="h-full flex items-center justify-center">
        <p className="text-7xl">{weatherIcon}</p>
      </div>
      <p className="h-full flex items-center justify-center">
        {data.day.mintemp_c}
        <sup className="mt-3">°</sup>
      </p>
    </div>
  );
}

export default ForecastWeatherTile;
