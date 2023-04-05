import local from "passport-local";

import ddb_User from "../ddb/ddb_User.js";

const authHandler = async (email, password, done) => {
  const [valid, user] = await ddb_User.authenticate(email, password);
  if (valid) {
    return done(null, user);
  }
  return done(null, false, { message: "Invalid credentials" });
};

export default new local.Strategy({ usernameField: "email" }, authHandler);
