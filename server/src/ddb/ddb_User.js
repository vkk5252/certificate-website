import Bcrypt from "bcrypt";
import { putItem, getItem, deleteItem, query } from "./ddbActions.js";

const saltRounds = 10;

class ddb_User {
  static async authenticate(email, enteredPassword) {
    const user = await ddb_User.getUser(email);

    return [Bcrypt.compareSync(enteredPassword, user.cryptedPassword), user];
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

    return await getItem(params);
  }
}

export default ddb_User;