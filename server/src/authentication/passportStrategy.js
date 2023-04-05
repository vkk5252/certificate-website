import local from "passport-local";

import User from "../models/User.js";
import ddb_User from "../ddb/ddb_User.js";

// const authHandler = (email, password, done) => {
//   User.query()
//     .findOne({ email })
//     .then((user) => {
//       if (user) {
//         if (user.authenticate(password)) {
//           return done(null, user);
//         }

//         return done(null, false, { message: "Invalid credentials" });
//       }
//       return done(null, false, { message: "Invalid credentials" });
//     });
// };

const authHandler = async (email, password, done) => {
  const [valid, user] = await ddb_User.authenticate(email, password);
  // user.id = "1";
  // user.createdAt = new Date();
  // user.updatedAt = new Date();
  if (valid) {
    console.log("authenticated, user:");
    console.log(user);
    return done(null, user)
  }
  console.log("invalid");
  return done(null, false, { message: "Invalid credentials" });
};

export default new local.Strategy({ usernameField: "email" }, authHandler);
