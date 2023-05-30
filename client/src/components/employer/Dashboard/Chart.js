import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import Title from '../Title';

const Chart = ({ data, gotData, activeBarIndex, setActiveBarIndex, setBarHoverIndex, highlightedIndex }) => {
  return (
    <>
      <Title>New candidates</Title>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="name" />
          {gotData && <YAxis />}
          <YAxis axisLine={true} tick={false} />
          <Bar
            dataKey="count"
            onMouseEnter={(_, index) => {
              setBarHoverIndex(index);
            }}
            onMouseLeave={(_, index) => {
              setBarHoverIndex(false);
            }}
            onClick={(_, index) => {
              if (index === activeBarIndex) {
                setActiveBarIndex(false);
              } else {
                setActiveBarIndex(index);
              }
            }}
          >
            {data.map((entry, index) => {
              return <Cell
                key={`cell-${index}`}
                fill={index === highlightedIndex ? "#e309df" : "#03fcd3"}
              />
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;