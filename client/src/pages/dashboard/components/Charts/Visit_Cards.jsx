import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const VisitCard = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 280,
      type: "area",
      toolbar: {
        show: false, // Esto oculta el menú de zoom y otros controles del Chart
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Visitas",
      data: [],
    },
  ]);

  const [period, setPeriod] = useState(7); // Período de 5 días por defecto

  useEffect(() => {
    // Aquí vamos a implementas la logica para obtener los datos de visitas para los últimos "period" días.

    //Datos de ejemplo de visitas para la Demo 2.
    const data = [45, 10, 38, 1, 19, 23, 2];

    // En esta parte, seleccionamos los datos para los últimos 5 o 10 días
    const today = new Date();
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const categories = [];
    for (let i = 0; i < period; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      categories.push(dayLabels[date.getDay()]); // Mostrar el día de la semana
    }

    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        categories: categories.reverse(), // Revertir para que el día más reciente esté a la derecha
      },
    }));

    setChartSeries([
      {
        name: "Visitas",
        data: data.reverse(), // Revertir los datos para que coincidan con las etiquetas
      },
    ]);
  }, [period]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg -mt-4 p-2 w-[400px] scale-[0.9] duration-300 hover:scale-[0.91] hover:bg-[#fff4ee]">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h2 className="text-2xl uppercase text-gray-800 mb-2">visitas</h2>
          <h2 className="text-1xl font-extrabold uppercase text-gray-800 mb-2">
            {" "}
            {period} days{" "}
          </h2>
        </div>
        <p className="text-gray-600 mb-1 capitalize">2000 visitas</p>
        <p className="text-gray-800 font-bold mb-2 capitalize">
          <div>
            <button
              onClick={() => handlePeriodChange(7)}
              className={`text-blue-500 hover:text-blue-700 ${
                period === 7 ? "font-bold" : ""
              }`}
            >
              7 days
            </button>
            {" - "}
            <button
              onClick={() => handlePeriodChange(14)}
              className={`text-blue-500 hover:text-blue-700 ${
                period === 14 ? "font-bold" : ""
              }`}
            >
              14 days
            </button>
          </div>
        </p>
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={150}
      />
    </div>
  );
};

export default VisitCard;
