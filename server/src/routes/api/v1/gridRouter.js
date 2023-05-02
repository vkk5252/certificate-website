import express from "express";
import ddb_User from "../../../ddb/ddb_User.js";

const gridRouter = new express.Router();

gridRouter.get("/", async (req, res) => {
  const { userEmail } = req.query;
  const data = await ddb_User.getGrid(userEmail);
  console.log(data);

  return res.status(200).json({ data });
});

gridRouter.post("/", async (req, res) => {
  const { userEmail } = req.query;
  const row = req.body;
  console.log(row);
  const message = await ddb_User.writeGrid(row);
  console.log(message);

  return res.status(message === "success" ? 200 : 400).json({ message });
});

export default gridRouter;