import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Title from "../Title.js"
import PieChartLegend from './PieChartLegend.js';


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius * 1.05}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff331c'];

const StatusPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeStatus, setActiveStatus] = useState({});
  const onPieEnter = ({ name, percent }, index) => {
    setActiveIndex(index);
    setActiveStatus({ name, percent });
  };

  const onPieLeave = (payload, index) => {
    setActiveIndex(-1);
    setActiveStatus({});
  }

  return (
    <>
      <Title>Candidate statuses</Title>
      <div id="pie">
        <PieChart width={300} height={300}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationDuration={700}
            animationBegin={0}
            label={({ index }) => true ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(index) : ""}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <PieChartLegend data={data} activeIndex={activeIndex} />
    </>
  );
}

export default React.memo(StatusPieChart);