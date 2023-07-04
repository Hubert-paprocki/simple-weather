import React, { useRef } from "react";
import ForecastWeatherTile from "../ForecastWeather/ForecastWeatherTile";
import { WeatherData } from "../../../../App";
import Button from "../../Buttons";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
interface ForecastWeatherListProps {
  data: WeatherData;
}

function ForecastWeatherList({ data }: ForecastWeatherListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (side: string) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: side === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex justify-center w-full gap-1 ml-6">
      <Button onClick={() => scroll("left")}>
        <p className="text-3xl">
          <HiOutlineChevronLeft />
        </p>
      </Button>
      <div
        className="flex max-w-[288px] gap-3 overflow-x-scroll"
        ref={scrollContainerRef}
      >
        {data?.forecast.forecastday.slice(1).map((item, index) => (
          <ForecastWeatherTile key={index} data={item} />
        ))}
      </div>
      <Button onClick={() => scroll("right")}>
        <p className="text-3xl">
          <HiOutlineChevronRight />
        </p>
      </Button>
    </div>
  );
}

export default ForecastWeatherList;
