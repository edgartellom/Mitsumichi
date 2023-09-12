import React from "react";

import {
  Area_Chart,
  Column_Chart,
  Donut_Chart,
  Register_Cards,
  Visit_Cards,
} from "../../components";

const areaChartOptions = {
  xaxis: {
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  colors: ["#FF5733", "#5E2FFF"],
};

const areaChartSeries = [
  {
    name: "Ordenes Realizadas",
    data: [30, 40, 25, 50, 49, 21, 70, 51],
  },
  {
    name: "Ordenes Canceladas",
    data: [23, 12, 54, 61, 32, 56, 81, 19],
  },
];

const columnChartOptions = {
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  colors: ["#c63c05"],
};

const columnChartSeries = [
  {
    name: "Ventas Completadas",
    data: [30, 40, 25, 50, 49, 21, 70, 51],
  },
];

const donutChartOptions = {
  labels: [
    "Scooter",
    "Naked",
    "Enduro",
    "Street",
    "CUB",
    "On-Off Road",
    "Off Road",
    "Custom",
  ],
  colors: [
    "#c63c05",
    "#5E2FFF",
    "#33b457",
    "#FF33C7",
    "#33A4FF",
    "#FFA180",
    "#a58fa6",
    "#F61423",
  ],
  dataLabels: {
    style: {
      colors: ["#000000"], // Cambia los colores del texto aquí
    },
  },
};

const donutChartSeries = [44, 55, 41, 17, 15, 20, 12, 18];

const Dashboard = () => {
  return (
    <div className="min-h-full bg-slate-100 p-5">
      <div className="flex flex-wrap items-center justify-around gap-2">
        <Visit_Cards />
        <Register_Cards />
      </div>
      <div className="flex flex-wrap items-center justify-around gap-2">
        <div className="flex flex-col">
          <h1 className="text-center mb-4 text-2xl uppercase">
            Analisis de Ordenes Realizadas
          </h1>
          <Area_Chart
            options={areaChartOptions}
            series={areaChartSeries}
            width={600}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-center mb-4 text-2xl uppercase">
            Analisis de Ventas Mensuales
          </h1>
          <Column_Chart
            options={columnChartOptions}
            series={columnChartSeries}
            width="600"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-center mb-4 text-2xl uppercase">
            Analisis de Ventas por Categoria
          </h1>
          <Donut_Chart
            options={donutChartOptions}
            series={donutChartSeries}
            width={450}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
