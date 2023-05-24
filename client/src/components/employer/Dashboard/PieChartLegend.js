import React from "react";

const PieChartLegend = ({ data, activeIndex }) => {
  const legend = data.map(({ name, value }, index) => {
    return (
      <p className={`pie-legend-entry ${index === activeIndex && "highlighted-sector"}`}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(index)} — {value}% {name}
      </p>
    )
  });
  return (
    <>
      {legend}
    </>
  );
};

export default PieChartLegend;