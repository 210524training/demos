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
    },
    {
      AttributeName: 'name',
      AttributeType: 'S'
    }
  ],
  ProvisionedThroughput: {
      ReadCapacityUnits: 3,
      WriteCapacityUnits: 3
  },
  StreamSpecification: {
      StreamEnabled: false
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'name-index',
      KeySchema: [
        {
          AttributeName: 'name',
          KeyType: 'HASH'
        }
      ],
      Projection: {
        ProjectionType: 'ALL'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
    },
    }
  ]
};

dynamo.createTable(params, (err, data) => {
  if(err) {
    console.log("error", err);
  } else {
    console.log("Table Created", data);
  }
});