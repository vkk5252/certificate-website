import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/users/new/employer",
  "/verify",
  "/reset-password",
  "/home",
  "/dashboard",
  "/home/employer",
  "/user-session/new/employer",
  "/verify-email",
  "/employee-grid",
  "/forgot-password",
  "/forgot-password/email-sent",
  "/grid-demo"
];
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;