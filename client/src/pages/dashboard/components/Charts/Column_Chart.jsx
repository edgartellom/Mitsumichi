import React from "react";
import Chart from "react-apexcharts";

const ColumnChart = ({ options, series, width }) => {
  return (
    <div className="column">
      <Chart options={options} series={series} type="bar" width={width} />
    </div>
  );
};

export default ColumnChart;
