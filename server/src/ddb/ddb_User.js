import Bcrypt from "bcrypt";
import { putItem, getItem, deleteItem, query } from "./ddbActions.js";

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
        cryptedPassword: Bcrypt.hashSync(password, saltRounds)
      },
      TableName: "Certificate_Users"
    };
    const result = await putItem(params);

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
}

export default ddb_User;