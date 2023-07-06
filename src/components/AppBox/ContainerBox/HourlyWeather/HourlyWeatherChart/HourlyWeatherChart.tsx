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

  const labels = [...hourlyData, ...hourlyData2].reduce((acc, hour) => {
    const hourDate = new Date(hour.time);
    if (hourDate >= oneHourBefore && hourDate <= dayAhead) {
      acc.push(hour.time.substring(10, 16));
    }
    return acc;
  }, []);

  const datas = [...hourlyData, ...hourlyData2].reduce((acc, hour) => {
    const hourDate = new Date(hour.time);
    if (hourDate >= oneHourBefore && hourDate <= dayAhead) {
      acc.push(hour.temp_c);
    }
    return acc;
  }, []);

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      x: {
        display: true,
        position: "left" as const,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        data: datas,
        borderColor: "#0284c7",
        backgroundColor: "rgba(2, 132, 199, 0.3)",
        yAxisID: "y",
      },
    ],
  };

  return (
    <div className="w-3/4 max-w-5xl bg-slate-50 rounded-md p-7 flex gap-1">
      <Line options={options} data={chartData} width={15} height={5} />
    </div>
  );
}

export default HourlyWeatherChart;
