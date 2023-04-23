import express from "express";

import ddb_User from "../../../ddb/ddb_User.js"

const usersInfoRouter = new express.Router();

usersInfoRouter.post("/", async (req, res) => {
  const { firstName, lastName, address, city, zipcode } = req.body;
  console.log("req.user", req.user);
  let email = req.user.email;
  try {
    const persistedUserInfo = await ddb_User.saveUserInfo(email, firstName, lastName, address, city, zipcode);
    if (persistedUserInfo) {
        return res.status(201).json({ msg: persistedUserInfo});
    }
    throw new Error("user info save failed");
  } catch (error) {
    console.error(error);
    return res.status(422).json({ errors: {email: "user info save failed"} });
  }
});

export default usersInfoRouter;