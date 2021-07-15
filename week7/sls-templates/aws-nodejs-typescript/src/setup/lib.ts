import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const TableName = 'training-210524-dynamo-example';
const ddb = new AWS.DynamoDB({ apiVersion: 'latest' });

export async function createTable() {
  const params: AWS.DynamoDB.CreateTableInput = {
    KeySchema: [
      {
        AttributeName: 'category',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'id',
        KeyType: 'RANGE',
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'category',
        AttributeType: 'S',
      },
      {
        AttributeName: 'id',
        AttributeType: 'S',
      }
    ],
    TableName,
    ProvisionedThroughput: {
      ReadCapacityUnits: 3,
      WriteCapacityUnits: 3,
    },
    StreamSpecification: {
      StreamEnabled: false,
    }
  };

  try {
    const response = await ddb.createTable(params).promise();

    console.log(response);
  } catch(error) {
    console.log('Failed to create table: ', error);
  }
}

