import AWS from 'aws-sdk';
import {v4 as uuid } from 'uuid';

AWS.config.update({ region: 'us-east-1'});

const QueueUrl = 'https://sqs.us-east-1.amazonaws.com/855430746673/210524training-demo';

const sqs = new AWS.SQS({ apiVersion: 'latest' });

const sendMessage = async (body: string) => {
  const params: AWS.SQS.SendMessageRequest = {
    MessageBody: body,
    QueueUrl,
    MessageAttributes: {
      hello: {
        DataType: 'String',
        StringValue: 'there'
      },
      general: {
        DataType: 'String',
        StringValue: 'Kenobi'
      },
      myName: {
        DataType: 'String',
        StringValue: 'Jeff'
      }
    }
  }

  return sqs.sendMessage(params).promise();
}

console.log('Sending Messages...');

setInterval(async () => {
  try {
    const response = await sendMessage(uuid());

    console.log(response);
  } catch(error) {
    console.log(error);
  }
  
}, 3000);
