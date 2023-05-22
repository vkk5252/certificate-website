import * as React from 'react';
import { useState, useEffect, useContext } from "react";
import { useTheme } from '@mui/material/styles';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title';
import { UserContext } from "../../App.js";

const Chart = ({ timePeriod, data, gotData }) => {
  return (
    <>
      <Title>New candidates</Title>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="name" />
          {gotData && <YAxis />}
          <YAxis axisLine={true} tick={false}/>
          <Bar dataKey="count" fill="#03fcd3" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;