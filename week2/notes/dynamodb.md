## DynamoDB
Dynamo Database is a serverless, NoSQL database solution created by AWS. The way AWS tells it, they developed DynamoDB to better handle Prime Day traffic.

### Serverless
We don't want to pay for a server to run 24/7 whether it is being used or not.
We don't want to have to constantly scale our servers up or down depending on demand, and we don't want to have to configure auto-scaling for our EC2s.
We don't want to have to update those servers, or install anything on those servers, or secure those servers. So what do we do?
Serverless architecture is essentially cloud resources that only exist when they are being used (for you).
- No server is running when the service is not in use
- You do not pay for the costs of the service if you are not using it


Pro:
- Not paying while not using it
- Ex. I have a database that I need to make queries infrequently or on an unpredictable schedule
  
Con:
- If I need to constantly make requests to it, I'll be paying more for it than a non-serverless solution
- Could potentially (though not as much as you might think in the specific case of DynamoDB) result in significant latency

### NoSQL
- Any database solution which does not implement the SQL relational database model
- NoSQL can actually refer to a relational database if that database doesn't implement SQL, and no two NoSQL database solutions are truly alike

Pro:
- Don't have to worry as much about data schema
- We store our data the way we are going to use the data (don't have to transform the data to make it workable)

Con:
- Data integrity may suffer
- Querying the data can be very innefficient as we cannot really perform relational queries
    - To avoid this, much forthought is needed to decide upon the Primary Key and Indexes *before* creating the table

### Free Tier
- 25 GB of Storage
- 25 provisioned Write Capacity Units (WCU)
- 25 provisioned Read Capacity Units (RCU)
- Enough to handle up to 200M requests per month.

### Read and Write Capacity Units
We can provision capacity:
- We have a set amound of requests (read and write) that we can perform in a time period
- less expensive


We can have on-demand capacity
- We pay for what we use
- More expensive

#### Capacity Units ([Stolen directly from AWS](https://aws.amazon.com/dynamodb/pricing/provisioned/))
- Read capacity unit (RCU): Each API call to read data from your table is a read request. Read requests can be strongly consistent, eventually consistent, or transactional. _For items up to 4 KB in size, one RCU can perform one strongly consistent read request per second. Items larger than 4 KB require additional RCUs. For items up to 4 KB in size, one RCU can perform two eventually consistent read requests per second._ Transactional read requests require two RCUs to perform one read per second for items up to 4 KB. For example, a strongly consistent read of an 8 KB item would require two RCUs, an eventually consistent read of an 8 KB item would require one RCU, and a transactional read of an 8 KB item would require four RCUs. See Read Consistency for more details.
- Write capacity unit (WCU): Each API call to write data to your table is a write request. For items up to 1 KB in size, one WCU can perform one standard write request per second. Items larger than 1 KB require additional WCUs. Transactional write requests require two WCUs to perform one write per second for items up to 1 KB. For example, a standard write request of a 1 KB item would require one WCU, a standard write request of a 3 KB item would require three WCUs, and a transactional write request of a 3 KB item would require six WCUs

### Primary Key
A Key that identifies an item.
- Hash Key / Partition Key
    - Partitions the table for queries, based on a single attribute
- Range Key / Sort Key
    - Allows us to group multiple items under a single partition key

Our Partition key will be our Hash Key. This is the primary identifier for an item in our Database.

In order to take maximum advantage of what DynamoDB offers, you need to really consider what attributes to use for the Primary Key.
If you use a Hash Key & Range Key, you want your data to be approximately evenly distributed across the values of the Hash Key.
The values used for the Range Key don't matter as much, but together with the Hash Key, must uniquely identify each item.
Each value of the Hash Key can have multiple values for the Range Key.

Hash Key        |    Range Key     |     Attribute 1     |     Attribute 2     |
:---------------|------------------|---------------------|---------------------|
Value1          |Range1            |Some Data            |Some Data            |
Value1          |Range2            |Some Data            |Some Data            |
Value1          |Range3            |Some Data            |Some Data            |
Value2          |Range1            |Some Data            |Some Data            |

#### Local Secondary Index
An index where the first element is the Partition Key of the database and the second is another attribute that we can used to sort. Sometimes known as a sort key.

Acts similarly to a standard Range Key for the Primary Key.
The core difference is that the combination of Attributes for the Primary key must be unique.
But this does not apply for Local Secondary Indexes.

Hash Key        |Index Range Key   |     Attribute 1     |     Attribute 2     |
:---------------|------------------|---------------------|---------------------|
Value1          |Range1            |Some Data            |Some Data            |
Value1          |Range1            |Some Data            |Some Data            |
Value1          |Range2            |Some Data            |Some Data            |
Value2          |Range3            |Some Data            |Some Data            |

If there are duplicate values for the Index Range Key, then they will be collected together during a query.

The default quota for local secondary indexes is 5. You would have to contact AWS to obtain more.

#### Global Secondary Indexes
This type of Index duplicates the entire table.
It results in worse performance for Write Oprations, and directly leads to Consistency issues during Reads.
This index has its own Primary Key, which can be completely different from the primary table.

The default quota for GSIs is 20. You would have to contact AWS to obtain more.

The more indexes we add, the worse performance will become, and the more expensive operations become, as writes have to update each index in addition to the table itself.
Each Global Secondary Index requires additional provisioned capacity because it is using a different partition key.

##### Configuration Options

There are some configuration options we can specify when creating our indexes. One of the important ones is the Projection.
This option configures which attributes will be duplicated into the index.
The Partition Key and Sort Key are *always* copied into the index.
Any other Attribute is optional.

The deciding factor will depend on the use-case.
If you don't project the attributes, then DynamoDB will have to query the original table to obtain them, costing more Read Capacity.
However, if you find that you generally don't need to query those attributes, then you don't need to bother.
The more attributes you project into the index, the higher the storage requirement.

### Scan vs Query
Scan looks at the entire table and then returns results. Query allows us to look at a partition (using the partition key) of the table and then return results.
During a Query, we return all of the Range Key results for a specific value of the partition key.
A query *must* specify a value for the partition key (it cannot search all partition key values, because that would be a scan).

If I don't have the table partitioned, then to retrieve a subset of the table (but not just one item) I have to perform a scan. We don't want to perform a scan unless we have to.