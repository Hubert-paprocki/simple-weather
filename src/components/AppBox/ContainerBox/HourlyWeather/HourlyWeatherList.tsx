import React, { useRef } from "react";
import HourlyWeatherTile from "./HourlyWeatherTile";
import Button from "../../Buttons";
import { WeatherData } from "../../../../App";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

interface HourlyWeatherListProps {
  data: WeatherData | null;
}

function HourlyWeatherList({ data }: HourlyWeatherListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hourlyData: Array<any> = data?.forecast.forecastday[0]?.hour || [];
  const hourlyData2: Array<any> = data?.forecast.forecastday[1]?.hour || [];

  const userDate = new Date();
  const oneHourBefore = new Date(userDate.getTime() - 60 * 60 * 1000);
  const twentyFourHoursAhead = new Date(
    userDate.getTime() + 24 * 60 * 60 * 1000
  );

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
    <div className="w-3/4 max-w-5xl bg-slate-50 rounded-md p-7 flex gap-1">
      <Button onClick={() => scroll("left")}>
        <p className="text-3xl">
          <HiOutlineChevronLeft />
        </p>
      </Button>
      <div
        className="flex gap-3 overflow-x-hidden p-1"
        ref={scrollContainerRef}
      >
        {[...hourlyData, ...hourlyData2].map((hour, i) => {
          const hourDate = new Date(hour.time);
          if (hourDate < oneHourBefore || hourDate > twentyFourHoursAhead)
            return null;
          console.log(i, hour);
          return <HourlyWeatherTile key={i} data={hour} />;
        })}
      </div>
      <Button onClick={() => scroll("right")}>
        <p className="text-3xl">
          <HiOutlineChevronRight />
        </p>
      </Button>
    </div>
  );
}

export default HourlyWeatherList;
