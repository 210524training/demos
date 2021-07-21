# SNS

Simple Notification Service.

Fully managed messaging service for both application-to-application and application-to-person messaging.

SNS allows you to create a topic and then allows you to create subscriptions to that topic. Any time a message is published to the topic, all subscribers receive the message.

Subscription Methods:
- AWS Lambda
- AWS SQS
- Email
- SMS
- AWS Kinesis Data Firehose
- Webhooks (http & https)
- and more

SNS facilitates the creation of a Publisher/Subscriber communication architecture/pattern.

## Publisher/Subscriber Pattern

It is a many-to-many communication architecture/pattern where you can have an arbitrary amount of publishers and an arbitrary amount of subscribers.

They can also be referred to as producers/consumers.

The key point is that any message that is produced will be received by ALL subscribers/consumers/listeners (whatever terminology makes the most sense) at the same time.

## Fan-out

Trigger multiple processes from a single message.

I could have a lambda function that needs to process a message and I have an application that needs to do different processing on the same message. At the same time, I need to send an email alert to administration when these messages arrive.

I can set up three different subscriptions to the one SNS topic and now all three things will happen on each message.

SNS has a bit of a problem by itself when used to support communication in a MSA.

Due to the nature of a MSA, it is possible for certain services to be completely down at some point in time. This might mean that an SNS topic would temporarily not have any subscribers.

What happens to the messages published to the topic during this timeframe? They don't go anywhere at all and are lost.

What about using a Dead-Letter Queue for the SNS topic? Would that help?
No. If there are no subscribers the messages are NOT sent, and therefore they didn't fail to send. The DLQ will not help in this scenario.

How do we fix this issue? We can't guarantee that our MSA will definitely have a subscriber. There will be scenarios where we have temporarily zero subscribers.

We can create a Queue via AWS SQS and subscribe to the topic with the queue. Queues will keep the messages around until they processed (up to 14 days).

# SQS

Simple Queue Service.

A fully managed Messaging Queue Service.

## Messaging Queues

An entity that takes in messages to be retrieved at a later time.

Messaging Queues are an important construct in a distributed architecture for ensuring delivery in an environment where we can't be sure that the recipient will exist when the message is delivered.

### Example Scenario

In our MSA Library example, we might have 5 replicas of our Billing Service. And the Authentication Service could attempt to delete a User. We need to ensure that Billing service is informed so that it can send out a letter/email/notification about any final payments necessary, or the fine will be escalated to a Collections Agency.

If the Authentication Service sends that request directly to the Billing Service, the load balancer is going to pick a particular instance to send the request to. What if that service is temporarily down? It does not get processed.

Instead, we can stand up a Messaging Queue between the Authentication Service and the Billing Service. And the message will wait until the Billing Service is available to poll the queue and process the request.

### Example Services

RabbitMQ, Apache Kafka, AWS SQS