import React, { useRef } from "react";
import ForecastWeatherTile from "../ForecastWeather/ForecastWeatherTile";
import { ForecastWeatherData } from "../../../../App";
import Button from "../../../Buttons/Buttons";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

interface ForecastWeatherListProps {
  data: ForecastWeatherData | undefined;
}

function ForecastWeatherList({ data }: ForecastWeatherListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (side: string) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left:
          side === "left"
            ? -scrollContainerRef.current.offsetWidth
            : scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex text-center overflow-hidden w-full gap-1 lg:ml-6">
      <Button onClick={() => scroll("left")} ariaLabel="scroll left">
        <p className="text-3xl">
          <HiOutlineChevronLeft />
        </p>
      </Button>
      <div className="flex gap-3 overflow-x-hidden " ref={scrollContainerRef}>
        {data &&
          data.forecastday
            .slice(1)
            .map((item, index) => (
              <ForecastWeatherTile key={index} data={item} />
            ))}
      </div>
      <Button onClick={() => scroll("right")} ariaLabel="scroll right">
        <p className="text-3xl">
          <HiOutlineChevronRight />
        </p>
      </Button>
    </div>
  );
}

export default ForecastWeatherList;
