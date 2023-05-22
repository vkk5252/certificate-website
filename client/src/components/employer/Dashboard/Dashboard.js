import React, { useState, useEffect, useContext } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Orders from './Orders';
import ToggleButtons from "./ToggleButtons.js";
import StatusPieChart from "./StatusPieChart.js";
import { UserContext } from "../../App";
import RecentGrid from "./RecentGrid.js";


const mdTheme = createTheme();

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("2 weeks");
  const days = {
    "week": 7,
    "2 weeks": 14,
    "month": 30
  }[timePeriod]
  const initialData = () => {
    const start = Math.floor((Date.now() - (days * 24 * 60 * 60 * 1000)));
    const startDate = new Date(start);
    const startDay = startDate.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const barData = [];
    for (let i = 0; i < days; i++) {
      barData.push({
        name: `${dayNames[(startDay + i + 1) % 7].substring(0, 3)}`,
        count: 0,
      });
    }

    return {
      bar: barData,
      pie: []
    }
  }
  const [data, setData] = useState(initialData());
  const [gotData, setGotData] = useState(false);
  const user = useContext(UserContext);
  const [activeStatus, setActiveStatus] = useState({});

  const getData = async () => {
    try {
      const response = await fetch(`/api/v1/dashboard?userEmail=${user.email}&days=${days}`);
      const body = await response.json();
      setData(body);
    } catch (err) {
      console.error("Error in fetch: ", err)
    }
  }

  useEffect(() => {
    getData();
  }, [timePeriod]);


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <div style={{ display: "inline" }}>
              <h2 style={{ marginBottom: "12px" }}>Dashboard</h2>
              <ToggleButtons timePeriod={timePeriod} setTimePeriod={setTimePeriod} />
            </div>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart
                    timePeriod={timePeriod}
                    data={data.bar}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                  <StatusPieChart
                    data={data.pie}
                    activeStatus={activeStatus}
                    setActiveStatus={setActiveStatus}
                  />
                     {activeStatus["name"] && `${Math.round(activeStatus.percent * 100)}% ${activeStatus.name}`}
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12} md={6} lg={7}>
                <Paper sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: "space-between",
                  height: 400
                }}>
                  <RecentGrid rows={data.grid || []} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;