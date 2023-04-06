import express from "express";

import ddb_User from "../../../ddb/ddb_User.js"

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await ddb_User.createUser(email, password);
    if (persistedUser) {
      return req.login(persistedUser, () => {
        return res.status(201).json({ user: persistedUser });
      });
    }
    throw new Error("user already exists");
  } catch (error) {
    console.error(error);
    return res.status(422).json({ errors: {email: "email already taken"} });
  }
});

export default usersRouter;