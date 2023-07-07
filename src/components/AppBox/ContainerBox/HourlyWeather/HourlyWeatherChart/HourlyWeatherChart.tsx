import React from "react";
import { Line } from "react-chartjs-2";
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
  LinearScaleOptions,
} from "chart.js";

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
  data: any;
}

function HourlyWeatherChart({ data }: HourlyWeatherChartProps) {
  const hourlyData: Array<any> = data?.forecast.forecastday[0]?.hour || [];
  const hourlyData2: Array<any> = data?.forecast.forecastday[1]?.hour || [];

  const userDate = new Date();
  const oneHourBefore = new Date(userDate.getTime() - 60 * 60 * 1000);
  const dayAhead = new Date(userDate.getTime() + 24 * 60 * 60 * 1000);

  const hourlyWeatherLabels = [...hourlyData, ...hourlyData2].reduce(
    (acc, hour) => {
      const hourDate = new Date(hour.time);
      if (hourDate >= oneHourBefore && hourDate <= dayAhead) {
        acc.push(hour.time.substring(10, 16));
      }
      return acc;
    },
    []
  );

  const hourlyWeatherTemp = [...hourlyData, ...hourlyData2].reduce(
    (acc, hour) => {
      const hourDate = new Date(hour.time);
      if (hourDate >= oneHourBefore && hourDate <= dayAhead) {
        acc.push(hour.temp_c);
      }
      return acc;
    },
    []
  );

  const hourlyWeatherCondition = [...hourlyData, ...hourlyData2].reduce(
    (acc, hour) => {
      const hourDate = new Date(hour.time);
      if (hourDate >= oneHourBefore && hourDate <= dayAhead) {
        acc.push(hour.condition.text.toUpperCase());
      }
      return acc;
    },
    []
  );

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
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
          size: 16.5,
        },
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return hourlyWeatherCondition[index];
          },
          label: (context) => `${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        ticks: {
          callback: (value: string | number) => `${value}°C`,
          stepSize: 1,
        },
      },
      x: {
        display: true,
        position: "left" as const,
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
    hourlyWeatherLabels,
    datasets: [
      {
        fill: true,
        data: hourlyWeatherTemp,
        borderColor: "#0284c7",
        backgroundColor: "rgba(2, 132, 199, 0.3)",
        yAxisID: "y",
      },
    ],
  };

  return (
    <div className=" bg-slate-50 lg:rounded-md p-7 ">
      <Line options={options} data={chartData} width={200} height={300} />
    </div>
  );
}

export default HourlyWeatherChart;
