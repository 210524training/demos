import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'items',
  Key: {
    KEYNAME: 
  }
};
