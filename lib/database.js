import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const tableName = process.env.DYNAMODB_TABLE_NAME;

const ddbDocClient = DynamoDBDocumentClient.from(client);

export const getComments = async (post_id) => {
  const queryCommand = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": `comment#${post_id}`,
    },
  });
  try {
    const data = await ddbDocClient.send(queryCommand);
    return data.Items;
  } catch (err) {
    console.log("Error", err);
  }
}

export const postComment = async (post_id, email, comment) => {
  const putCommand = new PutCommand({
    TableName: tableName,
    Item: {
      pk: `comment#${post_id}`,
      created: Date.now(),
      post_id,
      email,
      comment,
    },
  });
  try {
    const data = await ddbDocClient.send(putCommand);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
}


