import * as React from 'react';
import { useState, useEffect, useContext } from "react";
import { useTheme } from '@mui/material/styles';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { UserContext } from "../App.js";

const Chart = ({ timePeriod }) => {
  const [gotData, setGotData] = useState(false);
  const days = {
    "week": 7,
    "2 weeks": 14,
    "month": 30
  }[timePeriod]
  const start = Math.floor((Date.now() - (days * 24 * 60 * 60 * 1000)));
  const startDate = new Date(start);
  const startDay = startDate.getDay()
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const initialData = [];
  for (let i = 0; i < days; i++) {
    initialData.push({
      name: `${dayNames[(startDay + i + 1) % 7].substring(0, 3)}`,
      count: 0,
    });
  }
  const user = useContext(UserContext);
  const [data, setData] = useState(initialData);
  const theme = useTheme();

  const getData = async () => {
    try {
      const response = await fetch(`/api/v1/dashboard?userEmail=${user.email}&days=${days}`);
      const body = await response.json();
      const { data } = body;
      setData(data);
      setGotData(true);
    } catch (err) {
      console.error("Error in fetch: ", err)
    }
  }

  useEffect(() => {
    getData();
  }, [timePeriod]);

  return (
    <React.Fragment>
      <Title>Created: past {timePeriod}</Title>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="name" />
          {gotData && <YAxis />}
          <YAxis axisLine={true} tick={false}/>
          <Bar dataKey="count" fill="#03fcd3" />
        </BarChart>
      </ResponsiveContainer>
      {/* 
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="days"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Activity
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer> */}
    </React.Fragment>
  );
}

export default Chart;