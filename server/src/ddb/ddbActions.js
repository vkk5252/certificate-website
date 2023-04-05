import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PutCommand, GetCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const REGION = "us-east-2";
const ddbClient = new DynamoDBClient({ region: REGION });

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions,
  unmarshallOptions,
});

const putItem = async (params) => {
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added or updated");
    return { message: "success" };
  } catch (err) {
    console.log("Error", err.stack);
    return { message: "error" };
  }
};

const getItem = async (params) => {
  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    console.log("Success :");
    return data.Item;
  } catch (err) {
    console.log("Error", err);
    return { message: "error" };
  }
};

const deleteItem = async (params) => {
  try {
    await ddbDocClient.send(new DeleteCommand(params));
    console.log("Success - item deleted");
    return { message: "success - deleted" }
  } catch (err) {
    console.log("Error", err);
    return { message: "error" }
  }
};

const query = async (params) => {
  try {
    const data = await ddbClient.send(new QueryCommand(params));
    return { message: "success", data: data.Items };
  } catch (err) {
    console.error(err);
    return { message: "error" };
  }
};

export { putItem, getItem, deleteItem, query };