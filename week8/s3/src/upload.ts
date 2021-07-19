import AWS from 'aws-sdk';
import fs from 'fs';
import { v4 as uuid } from 'uuid';

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3({ apiVersion: 'latest' });

const fileStream = fs.createReadStream('src/burger.txt');

const params: AWS.S3.PutObjectRequest = {
  Bucket: '210524training-grubdash',
  Key: `burger/${uuid()}.txt`,
  Body: fileStream,
}

s3.upload(params, (err, data) => console.log(err ? err : data));