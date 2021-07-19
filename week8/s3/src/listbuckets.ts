import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3({ apiVersion: 'latest'});

s3.listBuckets( (err, data) => {
  console.log(err ? err : data);
});

function listBucketsPromise(): Promise<AWS.S3.ListBucketsOutput> {
  return new Promise((resolve, reject) => {
    s3.listBuckets( (err, data) => {
      if(err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

listBucketsPromise()
    .then(data => console.log(data))
    .catch(err => console.log(err));

const params: AWS.S3.ListObjectsV2Request = {
  Bucket: 'training-210524-lambda-t-serverlessdeploymentbuck-kp3y5hrff0v3',
}

s3.listObjectsV2(params, (err, data) => console.log(err ? err : data));