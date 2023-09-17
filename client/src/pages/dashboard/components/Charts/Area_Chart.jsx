import React from "react";
import Chart from "react-apexcharts";

const AreaChart = ({ options, series, width }) => {
  return (
    <div className="area">
      <Chart options={options} series={series} type="area" width={width} />
    </div>
  );
};

export default AreaChart;
