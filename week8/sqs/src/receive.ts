import AWS from 'aws-sdk';
import {v4 as uuid } from 'uuid';

AWS.config.update({ region: 'us-east-1'});

const QueueUrl = 'https://sqs.us-east-1.amazonaws.com/855430746673/210524training-demo';

const sqs = new AWS.SQS({ apiVersion: 'latest' });

const receiveMessage = async () => {
  const params: AWS.SQS.ReceiveMessageRequest = {
    QueueUrl,
    AttributeNames: [
      'All'
    ],
    MessageAttributeNames: [
      'All'
    ],
    MaxNumberOfMessages: 10
  }

  try {
    const data = await sqs.receiveMessage(params).promise();

    if(!data.Messages || data.Messages.length === 0) {
      console.log('No messages received');
      return;
    }

    for(const message of data.Messages) {
      console.log(`Processing message ${message.MessageId}: ${message.Body}`);

      console.log('Message object: ', message);

      const deleteParams: AWS.SQS.DeleteMessageRequest = {
        QueueUrl,
        ReceiptHandle: message.ReceiptHandle as string,
      };

      const response = await sqs.deleteMessage(deleteParams).promise();

      console.log('Message deleted', response);
    }
  } catch(error) {
    console.log('Failed to process message', error);
  }
}

console.log('Receiving Messages...');

setInterval(receiveMessage, 20000);