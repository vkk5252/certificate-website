import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = ["/", "/user-sessions/new", "/users/new", "/verify", "/reset-password", "/home", "/home/employer", "user-session/new/employer", "/verify-email", "/employee-grid", "/forgot-password", "/forgot-password/email-sent"];
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;