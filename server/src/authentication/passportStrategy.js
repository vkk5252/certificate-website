import local from "passport-local";

import ddb_User from "../ddb/ddb_User.js";

const authHandler = async (email, password, done) => {
  const { registeredEmail, validCredentials, user } = await ddb_User.authenticate(email, password);
  if (!registeredEmail) {
    return done({email: "email not registered"});
  }
  if (!validCredentials) {
    return done({password: "invalid credentials"});
  }
  return done(null, user);
};

export default new local.Strategy({ usernameField: "email" }, authHandler);
