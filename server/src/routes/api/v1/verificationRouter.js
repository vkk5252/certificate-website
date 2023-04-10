import express from "express";
import ddb_User from "../../../ddb/ddb_User.js";
const verificationRouter = new express.Router();

verificationRouter.get("/", async (req, res) => {
  const { email, uuid } = req.query;
  const message = await ddb_User.verify(email, uuid);
  return res.status(200).json({ message });
});

export default verificationRouter;