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
      ConditionExpression: "attribute_not_exists(email)",
      Item: {
        email: email,
        cryptedPassword: Bcrypt.hashSync(password, saltRounds),
        verifiedEmail: false
      },
      TableName: "Certificate_Users"
    };
    const result = await putItem(params);
    let uuid;

    if (result.message !== "error") {
      uuid = await ddb_User.createEmailVerification(email);
      sendVerificationEmail(email, {
        name: email.split("@")[0],
        verificationLink: `http://localhost:3000/api/v1/verify-email/?email=${email}&uuid=${uuid}`
      });

    }

    return result.message === "error" ? false : params.Item;
  }

  static async getUser(email) {
    const params = {
      TableName: "Certificate_Users",
      Key: {
        email: email
      }
    }
    const user = await getItem(params);

    return user || false;
  }

  static async getVerification(email) {
    const params = {
      TableName: "certificate-website-verification",
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
      Item: {
        email: email,
        uuid: uuid,
        created: date.toUTCString()
      },
      TableName: "certificate-website-verification"
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
      Key: {
        email: email,
      },
      TableName: "Certificate_Users",
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