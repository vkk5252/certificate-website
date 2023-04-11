import express from "express";
import ddb_User from "../../../ddb/ddb_User.js";
const resetPasswordRouter = new express.Router();

resetPasswordRouter.post("/", async (req, res) => {
  const { email, uuid } = req.query;
  const { newPassword } = req.body;
  const message = await ddb_User.resetPassword(email, uuid, newPassword);
  const statusCode = message === "reset password successful" ? 200 : 400;
  return res.status(statusCode).json({ message });
});

resetPasswordRouter.post("/send-email", async (req, res) => {
  const { email } = req.body;
  const message = await ddb_User.forgotPassword(email);
  return res.status(200).json({ message });
});

export default resetPasswordRouter;