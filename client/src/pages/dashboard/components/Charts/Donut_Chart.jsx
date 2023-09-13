import React from "react";
import Chart from "react-apexcharts";

const Donut_Chart = ({ options, series, width }) => {
  return (
    <div className="donut">
      <Chart options={options} series={series} type="donut" width={width} />
    </div>
  );
};

export default Donut_Chart;
