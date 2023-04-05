import User from "../models/User.js";
import ddb_User from "../ddb/ddb_User.js";

export default async (email, done) => {
  // const user = await User.query().findById(email);
  const user = await ddb_User.getUser(email);
  // console.log("deserializing user")
  done(null, user || false);
};
