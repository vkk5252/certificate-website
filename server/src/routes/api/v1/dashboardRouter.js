import express from "express";
import ddb_User from "../../../ddb/ddb_User.js";

const dashboardRouter = new express.Router();

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

dashboardRouter.get("/", async (req, res) => {
  const { userEmail, days } = req.query;
  const gridData = await ddb_User.getGrid(userEmail);
  gridData.sort((record1, record2) => record2.created - record1.created);
  console.log(gridData)
  // const time = days;
  const start = Math.floor((Date.now() - (days * 24 * 60 * 60 * 1000)));
  const records = gridData.filter(record => record.created > start);
  const startDate = new Date(start);
  const startDay = startDate.getDay()
  const bar = [];
  for (let i = 0; i < days; i++) {
    bar.push({
      name: `${dayNames[(startDay + i + 1) % 7].substring(0, 3)}`,
      count: 0,
    });
  }
  records.forEach((record) => {
    const created = new Date(record.created);
    let daysAfterStart = Math.floor((record.created - start) / (24 * 60 * 60 * 1000));
    console.log(created.toDateString())
    console.log(daysAfterStart)
    bar[daysAfterStart]["count"] += 1;
  });

  console.log(bar)

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

  let grid = gridData.slice(0, 10);

  res.status(200).json({ bar, pie, grid });
})

export default dashboardRouter;