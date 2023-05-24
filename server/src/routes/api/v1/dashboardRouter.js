import express from "express";
import ddb_User from "../../../ddb/ddb_User.js";

const dashboardRouter = new express.Router();

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

dashboardRouter.get("/", async (req, res) => {
  const { userEmail, timePeriod } = req.query;
  console.log(timePeriod)
  const gridData = await ddb_User.getGrid(userEmail);
  gridData.sort((record1, record2) => record2.created - record1.created);
  const start = Math.floor((Date.now() - (timePeriod * 24 * 60 * 60 * 1000)));
  const records = gridData.filter(record => record.created > start);
  const startDate = new Date(start);
  const startDay = startDate.getDay()
  const bar = [];

  for (let i = 0; i < timePeriod; i++) {
    let xLabel = "";
    if (timePeriod < 30) {
      xLabel = `${dayNames[(startDay + i + 1) % 7].substring(0, 3)}`;
    } else {
      let labelDate = new Date(start + (i * 24 * 60 * 60 * 1000));
      xLabel = `${labelDate.getMonth()}/${labelDate.getDate()}`;
    }
    bar.push({
      name: xLabel,
      count: 0,
      created: 0
    });
  }
  records.forEach((record) => {
    let daysAfterStart = Math.floor((record.created - start) / (24 * 60 * 60 * 1000));
    bar[daysAfterStart]["count"] += 1;
    bar[daysAfterStart]["created"] = record.created;
  });

  let count = {};
  records.forEach(record => {
    if (count[record.status]) {
      count[record.status] += 1;
    } else {
      count[record.status] = 1;
    }
  });
  let pie = [];
  for (const status in count) {
    pie.push({ name: status, value: count[status] });
  }

  let grid = gridData;

  res.status(200).json({ bar, pie, grid });
})

export default dashboardRouter;