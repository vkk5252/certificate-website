import Bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import config from "../config.js";

import { putItem, getItem, deleteItem, query, updateItem } from "../aws/ddbActions.js";
import sendVerificationEmail from "../aws/sendVerificationEmail.js";

const saltRounds = 10;

class ddb_User {
  static async authenticate(email, enteredPassword) {
    const user = await ddb_User.getUser(email);
    const registeredEmail = !!user;
    const validCredentials = registeredEmail ? Bcrypt.compareSync(enteredPassword, user.cryptedPassword) : false;

    return { registeredEmail, validCredentials, user };
  }

  static async createUser(email, password) {
    const params = {
      TableName: config.database.users,
      ConditionExpression: "attribute_not_exists(email)",
      Item: {
        email: email,
        cryptedPassword: Bcrypt.hashSync(password, saltRounds),
        verifiedEmail: false
      }
    };
    const result = await putItem(params);
    let uuid;

    if (result.message !== "error") {
      uuid = await ddb_User.createEmailVerification(email);
      sendVerificationEmail(email, {
        name: email.split("@")[0],
        verificationLink: `http://localhost:3000/verify?email=${email}&uuid=${uuid}`
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

  static verify = async (email, uuid) => {
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
}

export default ddb_User;