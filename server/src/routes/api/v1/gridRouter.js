import express from "express";
import ddb_User from "../../../ddb/ddb_User.js";

const gridRouter = new express.Router();

gridRouter.get("/", async (req, res) => {
  const { userEmail } = req.query;
  const data = await ddb_User.getGrid(userEmail);

  return res.status(200).json({ data });
});

gridRouter.post("/", async (req, res) => {
  const { userEmail } = req.query;
  const row = req.body;
  const message = await ddb_User.writeGrid(row);
  console.log(row);

  return res.status(message === "success" ? 200 : 400).json({ message });
});

gridRouter.delete("/", async (req, res) => {
  const { email, id } = req.query;
  const message = await ddb_User.deleteGridRow(email, id);

  return res.status(message === "success" ? 200 : 400).json({ message });
});

export default gridRouter;