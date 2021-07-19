import fs from 'fs';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const fileStream = fs.createReadStream('src/burger.txt');

const token = process.env.ACCESS_TOKEN;

const name = `${uuid()}.txt`

// In order to allow this, we must forcibly change the write permissions on the S3 bucket
// through the AWS SDK

// Alternatively, we could authenticate via a Cognito User Pool
// Have that user in a group that grants access to S3
// And then use the accessToken in the Authorization Header as part of this axios request

// As it turns out, we are unable to provide access to the S3 REST API from a Cognito User directly

// Instead, we will have to create a lambda function that performs the upload using the AWS SDK
// (and not axios)
// And then the client will send the axios request to Lambda instead of directly to the S3
// By doing this, you can still leverage the access/id tokens to allow Cognito Users to
// upload to your S3 bucket
axios.put(`https://210524training-grubdash.s3.amazonaws.com/burger/${name}`, {
  body: fileStream.toString(),
  headers: {
    Authorization: `Bearer ${token}`,
  }
})
.then(response => console.log(response))
.catch(err => console.log(err));