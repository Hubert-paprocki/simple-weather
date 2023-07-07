import React from "react";
import Button from "./Buttons";

interface HourlyWeatherSwitchProps {
  displayHourlySwitch: (thing: string) => void;
  activeBtn: string;
}

function HourlyWeatherSwitch({
  displayHourlySwitch,
  activeBtn,
}: HourlyWeatherSwitchProps) {
  return (
    <div className="bg-slate-200 rounded-md flex gap-1.5 self-center">
      <Button
        onClick={() => {
          displayHourlySwitch("chart");
        }}
        switchsBtn
        activeBtn={activeBtn === "chart"}
      >
        Chart
      </Button>
      <Button
        onClick={() => {
          displayHourlySwitch("tile");
        }}
        switchsBtn
        activeBtn={activeBtn === "tile"}
      >
        Tiles
      </Button>
    </div>
  );
}

export default HourlyWeatherSwitch;
