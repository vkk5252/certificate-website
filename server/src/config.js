import "./boot.js";
import getNodeEnv from "./config/getNodeEnv.js";

export default {
  nodeEnv: getNodeEnv(),
  session: { secret: process.env.SESSION_SECRET },
  web: { host: process.env.HOST || "0.0.0.0", port: process.env.PORT || 3000 },
  emailVerificationMaxAge: 1 * 60 * 1000,
  passwordResetMaxAge: 5 * 60 * 1000,
  database: {
    users: "certificate-website-users",
    verification: "certificate-website-verification",
    resetPassword: "certificate-website-reset-password"
  },
  emailTemplatePaths: {
    verification: "./src/aws/ses/templates/verificationEmailTemplate.hbs",
    passwordReset: "./src/aws/ses/templates/passwordResetEmailTemplate.hbs"
  },
  envUrls: {
    production: "https://dcert-app.herokuapp.com",
    development: "http://localhost:3000"
  }
};