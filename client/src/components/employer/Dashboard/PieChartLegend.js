import React from "react";

const PieChartLegend = ({ data, activeIndex }) => {
  const total = data.reduce((sum, current) => sum + current.value, 0);
  const legend = data.map(({ name, value }, index) => {
    return (
      <p key={name} className={`pie-legend-entry ${index === activeIndex && "highlighted-sector"}`}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(index)} — {Math.round(100 * value / total)}% {name}
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