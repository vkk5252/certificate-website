import Bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import config from "../config.js";

import { putItem, getItem, deleteItem, query, updateItem } from "../aws/ddbActions.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../aws/ses/emailTypes.js";
import msToTimeString from "../utils/msToTimeString.js";

const saltRounds = 10;

class ddb_User {
  static async authenticate(email, enteredPassword) {
    const user = await ddb_User.getUser(email);
    const registeredEmail = !!user;
    const validCredentials = registeredEmail ? Bcrypt.compareSync(enteredPassword, user.cryptedPassword) : false;

    return { registeredEmail, validCredentials, user };
  }

  static async saveUserInfo(email, firstName, lastName, address, city, zipcode) {
    const user = await ddb_User.getUser(email);

    const params = {
      TableName: config.database.users,
      Key: {
        email: email,
      },
      UpdateExpression: "set firstName = :firstName, lastName = :lastName, address = :address, city = :city, zipcode = :zipcode",
      ExpressionAttributeValues: {
        ":firstName": firstName,
        ":lastName": lastName,
        ":address": address,
        ":city": city,
        ":zipcode": zipcode
      }
    };
    await updateItem(params);
    return "saved successful";
  }


  static async createUser(email, password, userType) {
    const params = {
      TableName: config.database.users,
      ConditionExpression: "attribute_not_exists(email)",
      Item: {
        email: email,
        cryptedPassword: Bcrypt.hashSync(password, saltRounds),
        userType: userType,
        verifiedEmail: false
      }
    };
    const result = await putItem(params);
    let uuid;

    if (result.message !== "error") {
      uuid = await ddb_User.createEmailVerification(email);
      sendVerificationEmail(email, {
        name: email.split("@")[0],
        verificationLink: config.envUrls[config.nodeEnv] + `/verify?email=${email}&uuid=${uuid}`,
        expirationTime: msToTimeString(config.emailVerificationMaxAge)
      });
    }

    return result.message === "error" ? false : params.Item;
  }

  static async getUser(email) {
    const params = {
      TableName: config.database.users,
      Key: {
        email: email
      }
    }
    const user = await getItem(params);

    return user || false;
  }

  static async getPasswordReset(email) {
    const params = {
      TableName: config.database.resetPassword,
      Key: {
        email: email
      }
    }
    const passwordReset = await getItem(params);

    return passwordReset || false;
  }

  static async getVerification(email) {
    const params = {
      TableName: config.database.verification,
      Key: {
        email: email
      }
    }
    const verification = await getItem(params);

    return verification || false;
  }

  static createEmailVerification = async (email) => {
    const date = new Date();
    const uuid = uuidv4();
    const params = {
      TableName: config.database.verification,
      Item: {
        email: email,
        uuid: uuid,
        created: date.toUTCString()
      }
    };
    await putItem(params);

    return uuid;
  }

  static async verify(email, uuid) {
    const user = await ddb_User.getUser(email);
    if (user.verifiedEmail) {
      return "email already verified";
    }

    const verification = await ddb_User.getVerification(email);
    if (!verification) {
      return "no active verification for this email";
    }

    const verificationCreatedAt = new Date(verification.created);
    const currentDate = new Date();
    if (uuid !== verification.uuid) {
      return "invalid verification";
    }

    if (currentDate.getTime() - verificationCreatedAt.getTime() > config.emailVerificationMaxAge) {
      return "verification expired";
    }

    const params = {
      TableName: config.database.users,
      Key: {
        email: email,
      },
      UpdateExpression: "set verifiedEmail = :verified",
      ExpressionAttributeValues: {
        ":verified": true,
      }
    };
    await updateItem(params);
    return "verification successful";
  }

  static async createResetPassword(email) {
    const date = new Date();
    const uuid = uuidv4();
    const params = {
      TableName: config.database.resetPassword,
      Item: {
        email: email,
        uuid: uuid,
        created: date.toUTCString()
      }
    };
    await putItem(params);

    return uuid;
  }

  static async forgotPassword(email) {
    const user = await ddb_User.getUser(email);
    if (!user) {
      return "email not registered";
    }
    const uuid = await ddb_User.createResetPassword(email);
    sendPasswordResetEmail(email, {
      name: email.split("@")[0],
      resetPasswordLink: config.envUrls[config.nodeEnv] + `/reset-password?email=${email}&uuid=${uuid}`,
      expirationTime: msToTimeString(config.passwordResetMaxAge)
    });
    return "password reset email sent";
  }

  static async resetPassword(email, uuid, newPassword) {
    const passwordReset = await ddb_User.getPasswordReset(email);
    if (!passwordReset) {
      return "no active password reset for this email";
    }

    const passwordResetCreatedAt = new Date(passwordReset.created);
    const currentDate = new Date();
    if (uuid !== passwordReset.uuid) {
      return "invalid password reset";
    }
    if (currentDate.getTime() - passwordResetCreatedAt.getTime() > config.passwordResetMaxAge) {
      return "password reset expired";
    }

    const params = {
      TableName: config.database.users,
      Key: {
        email: email,
      },
      UpdateExpression: "set cryptedPassword = :newCryptedPassword",
      ExpressionAttributeValues: {
        ":newCryptedPassword": Bcrypt.hashSync(newPassword, saltRounds),
      }
    };
    await updateItem(params);
    return "reset password successful";
  }

  static async getGrid(email) {
    const params = {
      TableName: config.database.grid,
      KeyConditionExpression: "userEmail = :userEmail",
      ExpressionAttributeValues: {
        ":userEmail": email
      }
    };

    const response = await query(params);

    return response.data || false;
  }

  static async writeGrid(row) {
    const params = {
      TableName: config.database.grid,
      Item: row
    };
    const result = await putItem(params);

    return result.message;
  }
}

export default ddb_User;