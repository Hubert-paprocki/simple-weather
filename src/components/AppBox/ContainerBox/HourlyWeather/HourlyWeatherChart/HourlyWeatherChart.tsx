import React from "react";
import { Line } from "react-chartjs-2";
import { ForecastWeatherData } from "../../../../../App";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from "chart.js";
import { HourlyWeatherData } from "../HourlyWeatherList/HourlyWeatherList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface HourlyWeatherChartProps {
  data: ForecastWeatherData | undefined;
}

function HourlyWeatherChart({ data }: HourlyWeatherChartProps) {
  const hourlyWeatherData: HourlyWeatherData[] = [
    ...(data?.forecastday[0]?.hour || []),
    ...(data?.forecastday[1]?.hour || []),
  ];

  const userDate = new Date();
  const oneHourBefore = new Date(userDate.getTime() - 60 * 60 * 1000);
  const dayAhead = new Date(userDate.getTime() + 24 * 60 * 60 * 1000);

  const filteredData = hourlyWeatherData.filter((byTheHour) => {
    const hourDate = new Date(byTheHour.time);
    return hourDate >= oneHourBefore && hourDate <= dayAhead;
  });

  const labels = filteredData.map((byTheHour) =>
    byTheHour.time.substring(10, 16)
  );

  const roundedTemperature = (temp: number) => Math.round(temp * 2) / 2;
  const hourlyWeatherTemp = filteredData.map((byTheHour) =>
    roundedTemperature(byTheHour.temp_c)
  );

  const hourlyWeatherCondition = filteredData.map((byTheHour) =>
    byTheHour.condition.text.toUpperCase()
  );

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        bodyFont: {
          size: 16,
        },
        titleFont: {
          size: 16,
        },
        displayColors: false,
        callbacks: {
          title: (tooltipItems) =>
            hourlyWeatherCondition[tooltipItems[0].dataIndex],
          label: (context) => `${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          callback: (value: string | number) => `${value}°C`,
          stepSize: 1,
        },
      },
      x: {
        display: true,
        position: "left",
        ticks: {
          display: true,
          font: {},
          padding: 0,
          maxRotation: 27,
          minRotation: 0,
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        data: hourlyWeatherTemp,
        borderColor: "rgba(2, 132, 199, 0.8)",
        backgroundColor: "rgba(2, 132, 199, 0.3)",
        yAxisID: "y",
      },
    ],
  };

  return (
    <div className="bg-slate-50 lg:rounded-md p-7">
      <Line options={options} data={chartData} width={200} height={300} />
    </div>
  );
}

export default HourlyWeatherChart;
