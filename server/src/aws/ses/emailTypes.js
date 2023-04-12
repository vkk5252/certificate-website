import sendEmail from "./sendEmail.js";
import config from "../../config.js";

const sendVerificationEmail = (email, data) => {
  sendEmail(config.emailTemplatePaths.verification, email, "Verify your email", data);
}

const sendPasswordResetEmail = (email, data) => {
  sendEmail(config.emailTemplatePaths.passwordReset, email, "Reset your password", data);
}

export { sendVerificationEmail, sendPasswordResetEmail };