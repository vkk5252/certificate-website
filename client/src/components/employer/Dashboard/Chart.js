import * as React from 'react';
import { useState, useEffect, useContext } from "react";
import { useTheme } from '@mui/material/styles';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, Label, ResponsiveContainer, Cell } from 'recharts';
import Title from '../Title';
import { UserContext } from "../../App.js";

const Chart = ({ timePeriod, data, gotData, activeBarIndex, setActiveBarIndex, barHoverIndex, setBarHoverIndex, highlightedIndex }) => {
  console.log("chart rerender")
  console.log((barHoverIndex >= 0 ? barHoverIndex : activeBarIndex))
  console.log(activeBarIndex)
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