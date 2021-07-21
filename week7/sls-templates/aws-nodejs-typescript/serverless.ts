import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import retrieveData from '@functions/retrieve-data';

const serverlessConfiguration: AWS = {
  service: 'training-210524-lambda-template',
  package: {
    individually: true,
  },
  frameworkVersion: '2',
  custom: {
    // webpack: {
    //   webpackConfig: './webpack.config.js',
    //   includeModules: {
    //     forceExclude: [
    //       'aws-sdk',
    //     ],
    //   },
    // },
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      external: [
        'aws-sdk'
      ],
      watch: {
        pattern: ['src/**/*'],
        ignore: ['.serverless/**/*', '.build', 'node_modules', '.esbuild']
      }
    }
  },
  plugins: ['serverless-esbuild', 'serverless-plugin-resource-tagging'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'revature-training',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    stackTags: {
      'Created By': 'Matthew Oberlies',
      'Delete After': '08/13/21',
      'Contact Before Delete': 'matthew.oberlies@revature.com',
      'Purpose': '210524 Serverless Example'
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello, retrieveData },
  resources: {
    Resources: {
      dynamoQuery: {
        Type: 'AWS::IAM::Role',
        Properties: {
          RoleName: 'lambda-dynamodb-query-access',
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: {
                  Service: [
                    'lambda.amazonaws.com'
                  ]
                },
                Action: 'sts:AssumeRole'
              }
            ]
          },
          Policies: [
            {
              PolicyName: 'lambda-dynamodb-query-access',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: [
                      'logs:CreateLogGroup',
                      'logs:CreateLogStream',
                      'logs:PutLogEvents'
                    ],
                    Resource: [
                      {
                        'Fn::Join': [
                          ':',
                          [
                            'arn:aws:logs',
                            {
                              Ref: 'AWS::Region'
                            },
                            {
                              Ref: 'AWS::AccountId'
                            },
                            'log-group:/aws/lambda/*:*:*'
                          ]
                        ]
                      }
                    ]
                  },
                  {
                    Effect: 'Allow',
                    Action: [
                      'dynamodb:*',
                    ],
                    Resource: [
                      {
                        'Fn::Join': [
                          ':',
                          [
                            'arn:aws:dynamodb',
                            {
                              Ref: 'AWS::Region'
                            },
                            {
                              Ref: 'AWS::AccountId'
                            },
                            'table/training-210524-dynamo-example'
                          ]
                        ]
                      }
                    ]
                  },
                ]
              }
            }
          ]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
