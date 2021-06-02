import AWS from 'aws-sdk';

// const docClient = new AWS.DynamoDB.DocumentClient();

AWS.config.update( {region: 'us-east-1'} );

const dynamo = new AWS.DynamoDB({ apiVersion: 'latest'} );

const params: AWS.DynamoDB.CreateTableInput = {
  TableName: 'items',
  KeySchema: [
    {
    AttributeName: 'position',
    KeyType: 'HASH'
    }
  ],
  AttributeDefinitions: [
    {
        AttributeName: 'position',
        AttributeType: 'S'
    }
  ],
  ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
  },
  StreamSpecification: {
      StreamEnabled: false
  }
};

dynamo.createTable(params, (err, data) => {
  if(err) {
    console.log("error", err);
  } else {
    console.log("Table Created", data);
  }
})