import ddb_User from "../ddb/ddb_User.js";

export default async (email, done) => {
  const user = await ddb_User.getUser(email);
  done(null, user || false);
};
