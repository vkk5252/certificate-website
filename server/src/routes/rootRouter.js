import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import verificationRouter from "./api/v1/verificationRouter.js";
import resetPasswordRouter from "./api/v1/resetPasswordRouter.js";
import sesRouter from "./api/v1/sesRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/verify-email", verificationRouter);
rootRouter.use("/api/v1/reset-password", resetPasswordRouter);
rootRouter.use("/api/v1/ses-verify-email", sesRouter);

export default rootRouter;
