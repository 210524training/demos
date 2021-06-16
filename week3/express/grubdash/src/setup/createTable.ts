import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config({});

AWS.config.update({ region: 'us-east-1' });

const ddb = new AWS.DynamoDB({ apiVersion: 'latest' });

const TableName = 'Grubdash';

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
    },
  ],
  TableName,
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  StreamSpecification: {
    StreamEnabled: false,
  },
};

(async () => {
  try {
    const response = await ddb.createTable(params).promise();

    console.log(response);
  } catch(error) {
    console.log('Failed to create table: ', error);
  }
})();
