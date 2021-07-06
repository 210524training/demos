import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config({});

AWS.config.update({ region: 'us-east-1' });

const ddb = new AWS.DynamoDB({ apiVersion: 'latest' });

const TableName = 'Grubdash';

(async () => {
  try {
    const response = await ddb.deleteTable({ TableName }).promise();

    console.log(response);
  } catch(error) {
    console.log('Failed to delete table: ', error);
  }
})();
