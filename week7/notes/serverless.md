# Functions as a Service (FaaS)

Sub-category of Platform as a Service. Wherein you simply have your function execute in the cloud and you do not worry about the underlying infrastructure or platform.

AWS Lambda will be the primary service we leverage for this model.

## Serverless

Someone else will own handle the underlying hardware. This is beneficial, since we do not have pay for a server 24/7. We simply pay for the execution time of our function. It abstracts away the complications of scaling.

Serverless architecture is essentially cloud resources that only exist when they are being used (for you).

It is rather cost-efficient. Technically, if you do have your functions being executed constantly, 24/7, there are some cases where it might be more expensive than owning the underlying hardware.

### AWS Lambda

Lambda is a service that runs code in an event-driven manner.

Something happens -> Lambda starts up -> runs your code -> spins down

If many events trigger at the same, Lambda might choose to create multiple instances of your Lambda to handle them.

Tradeoffs
- Initial requests in a series of requests are likely to be slow as we have to wait for the code to become available

The way it works is that we define a `handler` function and that function will get called when a specified event occurs.

Types of events:
1. API Gateway Request
2. S3 Upload
3. AWS SNS Notifications
4. Cognito User Sign Up
5. And many others

AWS Lambda functions are designed for speed and will only execute for a certain amount of time. The default timeout is 3 seconds. Any function that takes longer will fail unless you change the timeout for that function.

Timeouts can range from 1 second up to 15 minutes. However, depending on the source of the trigger, there may be other limitations. For example, certain API Gateways have a built in timeout of 30 seconds. Functions are triggered via that source can only have up to 29 second timeout.

### Handling Dependencies

If our Lambda uses NodeJS as its runtime, we can have npm packages as dependencies.

Lambdas are provided the aws-sdk as a dependency by default.

A few ways to add dependencies:
1. You can upload the node_modules directory
  - This is simple, but it bloats the size of your lambda function
  - Larger Lambda sizes will take longer to spin up
2. Create a Lambda "Layer"
  - We can create a portion of the filesystem that will be automatically mounted to your lambda, called a "layer"
  - Generally speaking, they are used to provide shared dependencies
    - This might some npm packages that are used in many different lambda functions
      - It is more efficient to mount the layer again instead of repackaging the exact same node_modules in every single lambda function
      - Layers of this kind will basically be zip files of a node_modules folder
    - You can also create lambda layers that consist of your own modules
  - Benefits are that your lambda can spin up much faster, and you can reuse some code between different lambdas
3. Use a bundler (like esbuild or webpack)
  - If you combine all of the dependencies into a single JS file, then you can just upload the 1 file
  - Benefits of tree-shaking to minimize the contents of the dependencies that you are leveraging
  - Downsides are that each lambda would have to be bundled independently, so there is no code sharing

Alternatively to dependencies within our code, we can leverage other AWS services from our Lambda Function.
For example, we might connect to a DynamoDB table or an SQS queue, or something else.
In order to access these other AWS services, we need to make sure that our Lambda has the proper IAM permissions.

IAM is not only for human beings as developers. Our programs can interact with our AWS account programmatically. Instead, we grant special permissions to AWS services to allow inter-service interaction programmatically, called IAM "roles".

## Serverless Framework/CLI

There is a software tool called the "Serverless Framework". It is a CLI tool, so you get access to commands such as `serverless create`, `serverless deploy`, `sls deploy`, `sls create`, etc. This CLI tool can be used to create and deploy cloud functions to many different cloud platforms. The CLI supports AWS, Azure, GCP, Tencent, etc.

We can install it globally, similarly to `expo` or `create-react-app`: `npm install -g serverless`
