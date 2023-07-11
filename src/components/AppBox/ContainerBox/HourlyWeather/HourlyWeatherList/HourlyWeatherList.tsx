import React, { useRef } from "react";
import HourlyWeatherTile from "./HourlyWeatherTile";
import Button from "../../../../Buttons/Buttons";
import { ForecastWeatherData } from "../../../../../App";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export interface HourlyWeatherData {
  condition: {
    text: string;
  };
  temp_c: number;
  temp_f: number;
  time: string;
}

interface HourlyWeatherListProps {
  data: ForecastWeatherData | undefined;
}

function HourlyWeatherList({ data }: HourlyWeatherListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hourlyWeatherData: HourlyWeatherData[] = [
    ...(data?.forecastday[0]?.hour || []),
    ...(data?.forecastday[1]?.hour || []),
  ];

  const userDate = new Date();
  const oneHourBefore = new Date(userDate.getTime() - 60 * 60 * 1000);
  const dayAhead = new Date(userDate.getTime() + 24 * 60 * 60 * 1000);

  const scroll = (side: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        side === "left"
          ? -scrollContainerRef.current.offsetWidth
          : scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const filteredData = hourlyWeatherData.filter((byTheHour) => {
    const hourDate = new Date(byTheHour.time);
    return hourDate >= oneHourBefore && hourDate <= dayAhead;
  });

  const hourlyWeatherTiles = filteredData.map((byTheHour, i) => (
    <HourlyWeatherTile key={i} hourlyWeather={byTheHour} />
  ));

  return (
    <div className="bg-slate-50 lg:rounded-md p-7 flex gap-1">
      <Button onClick={() => scroll("left")}>
        <p className="text-3xl">
          <HiOutlineChevronLeft />
        </p>
      </Button>
      <div
        className="flex gap-3 overflow-x-hidden p-1"
        ref={scrollContainerRef}
      >
        {hourlyWeatherTiles}
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
