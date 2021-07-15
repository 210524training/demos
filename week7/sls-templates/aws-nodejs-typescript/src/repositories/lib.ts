import dynamo from "src/dynamo/dynamo";


const docClient = dynamo;
const TableName = 'training-210524-dynamo-example';

export async function getAll(cat: string) {
  const params = {
    TableName,
    KeyConditionExpression: '#C=:ad',
    ExpressionAttributeNames: {
      '#C': 'category',
    },
    ExpressionAttributeValues: {
      ':ad': cat,
    },
  };
  const data = await docClient.query(params).promise();
  return data.Items as any[];
}
  
export async function updateStuff(id:string, cat:string, what:string, change:string) {
  const params = {
    TableName,
    Key: {
      'category': cat,
      'id': id,
    },
    UpdateExpression: 'set #W=:c',
    ExpressionAttributeNames: {
      '#W': what,
    },
    ExpressionAttributeValues: {
      ':c': change,
    },
    ReturnValues: 'ALL_NEW',
  };
  const returned = await this.docClient.update(params).promise();
  console.log(returned);
  return returned;
}
  
export async function deletStuff(id:string, cat:string) {
  const params = {
    TableName,
    Key: {
      'category': cat,
      'id': id,
    },
  };
  const returned = await this.docClient.delete(params).promise();
  console.log(returned);
  return returned;
}