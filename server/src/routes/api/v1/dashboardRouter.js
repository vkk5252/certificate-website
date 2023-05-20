import express from "express";
import ddb_User from "../../../ddb/ddb_User.js";

const dashboardRouter = new express.Router();

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

dashboardRouter.get("/", async (req, res) => {
  const { userEmail, days } = req.query;
  const gridData = await ddb_User.getGrid(userEmail);
  // const time = days;
  const start = Math.floor((Date.now() - (days * 24 * 60 * 60 * 1000)));
  const records = gridData.filter(record => record.created > start);
  const startDate = new Date(start);
  const startDay = startDate.getDay()
  const data = [];
  for (let i = 0; i < days; i++) {
    data.push({
      name: `${dayNames[(startDay + i + 1) % 7].substring(0, 3)}`,
      count: 0,
    });
  }
  records.forEach((record) => {
    const created = new Date(record.created);
    let daysAfterStart = Math.floor((record.created - start) / (24 * 60 * 60 * 1000));
    console.log(created.toDateString())
    console.log(daysAfterStart)
    data[daysAfterStart]["count"] += 1;
  });

  console.log(data)



  res.status(200).json({ data });
})

export default dashboardRouter;