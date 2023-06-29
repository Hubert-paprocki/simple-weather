import React, { useEffect, useState } from "react";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const city = `Cracow`;
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
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

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Display the weather data
  return (
    <div>
      <h1>Current Weather</h1>
    </div>
  );
};

export default WeatherApp;
