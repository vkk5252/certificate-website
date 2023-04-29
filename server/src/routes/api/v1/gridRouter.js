import express from "express";
import ddb_User from "../../../ddb/ddb_User.js";

const gridRouter = new express.Router();

gridRouter.get("/", async (req, res) => {
  const { userEmail } = req.query;
  const rows = await ddb_User.getGrid(userEmail);

  return res.status(200).json({ rows });
});

gridRouter.post("/", async (req, res) => {
  const { userEmail } = req.query;
  const row = req.body;
  console.log(row);
  const message = await ddb_User.writeGrid(row);
  console.log(message);


  return res.status(200).json({ message });
});

export default gridRouter;