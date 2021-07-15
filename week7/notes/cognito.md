# Cognito

An AWS solution for user sign-up, sign-in, and access control. An entire authorization service. You can create users and manage their passwords without having to build an authentication service.

## Benefits
- You are not writing encryption, so you can't mess it up
- You are not storing passwords or any sensitive user information
- We do not have to write authentication from the ground up

## Downsides
- More complex to work with than a simple authentication flow
- Must conform to Cognito's architecture

## Authentication vs Authorization
- Authentication
  - Are you who you say you are?
- Authorization
  - Do you have permission to do what you are asking?

## Amazon Cognito User Pools

Basic sign up and sign in. Allows you to have users and provides authentication for those users.
Also provides easy integration with social networks and Active Directory for single sign on.

## Amazon Cognito Federated Identities

Allows you to grant access to your AWS resources (such as S3, EC2, API Gateway) without giving them access to your entire infrastructure and contigent on authentication with Cognito.

You can also authenticate through Google or other services.

These credentials are temporary.

# AWS Amplify

Amplify is a software CLI tool, similar in concept to the serverless CLI, in that it can use provided AWS credentials to create resources on an AWS account for you. It works for a variety of different resources, but a common use case is to set up Cognito.

e.g. `amplify add auth`