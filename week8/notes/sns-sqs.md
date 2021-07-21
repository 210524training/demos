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

SQS will hold on to messages in the queue for 14 days. SQS supports up to 256 kb of text in any format for message payloads.

These payloads are separated out into 64 kb "chunks". Each chunk would be a single request. So the maximum size request of 256 kb would take 4 requests.

## Messaging Queues

An entity that takes in messages to be retrieved at a later time. 

Messaging Queues are an important construct in a distributed architecture for ensuring delivery in an environment where we can't be sure that the recipient will exist when the message is delivered.

### Example Scenario

In our MSA Library example, we might have 5 replicas of our Billing Service. And the Authentication Service could attempt to delete a User. We need to ensure that Billing service is informed so that it can send out a letter/email/notification about any final payments necessary, or the fine will be escalated to a Collections Agency.

If the Authentication Service sends that request directly to the Billing Service, the load balancer is going to pick a particular instance to send the request to. What if that service is temporarily down? It does not get processed.

Instead, we can stand up a Messaging Queue between the Authentication Service and the Billing Service. And the message will wait until the Billing Service is available to poll the queue and process the request.

### Example Services

RabbitMQ, Apache Kafka, AWS SQS

## Standard Queue

Supports the highest bandwidth amongst queue options, effectively unlimited number of transactions per second per API action.

Message delivery is guaranteed at least once (sometimes messages get copied).

Occasionally messages might be delivered out of order.

### Example Scenarios

Purchase transactions. It's fine if individual purchases occur out of order. What about the potential repeated messages?

Recall the example provided with S3, where we had a service that would resize an image uploaded to S3. Perhaps if we had a large MSA around this application, we might have multiple processes that must take place in response to the S3 upload. So instead we could used an SNS topic along with an SQS queue to process the messages.

In this case, if messages to resize images are received out of order or even multiple times, it is not an issue.

Another potential idea is to include an "idempotency token" as part of the message payload. Events/workflows that are "idempotent" means that they only occur once regardless of how many events/workflows are triggered.

The way this would work, would be that each message would have a unique token (like a UUID), and we only process messages if we have not seen the token before.

Note that in order to for this to work, we would have to track/persist the idempotency tokens that we process. But we could probably clear them out on a regular basis (like any tokens older than 14 days can removed from our storage).

When you receive a new message, you could just check the persistent storage (like a DB) if that token has already been processed. If it was, ignore the message.

This technique can be used to avoid processing the same message multiple times.

However, it does nothing about receiving messages out of order.

If the order of arrival is important, we might have to rely on a FIFO Queue.

## FIFO Queue

FIFO = First In, First Out

In contrast to Standard Queue, has lower throughput. Supports 300 messages per second. Batch messages up to 10 per operation, with a max of 3000 messages per second.

There is also a High Throughput mode that provides up to 10x the throughput. So that would be 3000 messages per second or up to 30,000 messages per second with batching.

Ensures messages are delivered exactly once.

This is accomplished by locking messages while they are actively being processed. In order to confirm that the message was successfully processed, you must delete it from the queue.

The same structure does also work with batch messages, and you would process the entire batch at once.

Additionally, strict order is enforced. Messages are delivered in the order that they arrived.

## Polling

In order to receive messages from a queue, you must poll the queue. Clients must reach out to the queue and ask if there are any messages available.

This is very different from the manner in which SNS operates. SNS has a push model, where subscribers are informed that there is a notification. SQS has a pull model, where clients must poll the queue.

Due to the way this works, Lambdas are not set up to process messages from a Queue.

Lambdas follow a Serverless model, so that they are not running by default and they only execute when something triggers them.

SQS follows a "pull" model, which means you need a system to occasionally ask SQS if there are any messages. Trying to force this with Lambda would result in a Lambda that is running 24/7. Which is not a good use-case.

On the other hand, SNS follows a "push" model which integrates nicely with Lambdas to process messages.

We _can_ use Lambdas to send messages to a queue. They just aren't great for processing from a queue.

### Short Polling

We send a request to check if there are any messages right now. We get a response immediately. If there are none, then the client will need to wait and ask again.

Additional note, is that for short polling with an immediate response, AWS may not check every server for messages. Which means there are some scenarios where there could be a message waiting, but the response will say there are none when short polling is used.

### Long Polling

Service sends a request to the queue to ask if there are any messages. If there are no messages, the queue will wait up to 20 seconds before saying no.

Additionally, there is enough time for AWS to check every server for messages.

## Dead-Letter Queues

When messages fail to send in either SNS or SQS, we can configure a queue to receive the messages that failed. This is useful for future analysis and debugging to identify common trends within those failed messages. It helps identify potential issues with certain messages.