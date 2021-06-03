import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient( {
    region: 'us-east-1',
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    apiVersion: 'latest'
});

interface Item {
    position: string,
    name: string,
    price: number,
    stock: number
}



async function addItem(item: Item): Promise<boolean> {
  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'items',
    Item: item
  };

  try {
    const result = await docClient.put(params).promise();

    console.log(result);
    return true;
  } catch(error) {
    console.log(error);
    return false;
  }
}

addItem({
  position: 'A0',
  name: 'Lays Barbecue Chips',
  price: 1.5,
  stock: 25
});