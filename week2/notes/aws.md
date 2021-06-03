# AWS: Amazon Web Services
Amazon provides many technical services available in the cloud
They follow a "pay as you go" model, which means you are only charged for the exact uptime of the services that you are leveraging.
They also have a series of services that are labelled as "free-tier", which will not cost money if used under certain limitations, such as 20 GB storage maximum, etc.
Some other services are under "free-tier" only for the first 12 months after making an AWS account.

There are MANY different services:
- EC2: Elastic Compute Cloud
    - Be careful about the name, don't mix it up
    - Cloud Server, Virtual Machine
    - Different OSes, such as linux, windows, mac, etc
    - We'll use linux
        - Often cheaper than the other choices
- EBS: Elastic Block Storage
    - Used to be its own service entirely
        - But now exists primarily under EC2s and other services
    - Isolated SSDs (Solid State Drive), that can be attached to other services
- RDS: Relational Database Service
    - Cloud database service
    - Similar to DynamoDB, but is SQL instead of NoSQL
    - Technically uses EC2 under the hood
- ELB: Elastic Load Balancer
    - Control traffic to split between sources/targets evenly
    - Tie into the concept of Horizontal Scaling
        - Where we have multiple instances/servers of the same service
        - We split traffic across them evenly
        - Very important tenant of SRE is scalability
- S3: Simple Storage Service
    - Large Object Storage (up to 5000 TB+)
    - Has metadata
        - Versioning feature
    - Structured within different S3 "buckets"
    - Different from EBS
    - Can store static html files
        - Allows static webpage hosting
    - Or perhaps static images
- API Gateway
    - Service that acts as an entrypoint for an event-driven architecture
    - One of the ways to trigger Lambdas
    - Interacts with many of AWS's Serverless services
- Cognito
    - AWS solution for user sign-up, sign-in, and access control
    - You can create users and manage their passwords and such, without having to build an authentication service
    - You aren't writing encryption (so you can't mess that up)
    - There's very little that you can't customize in Cognito
- Lambda
    - A service that runs code in an event-driven manner
    - Process
        1. Something happens
        2. Lambda starts up
        3. Runs your code
        4. Spins down
    - If many events trigger at the same time, Lamba might choose to create multiple instances of your Lambda to handle them
    - Tradeoffs
        - initial requests in a series of requests are likely to be slow as we wait for the code to become available
    - Literally just write a function and that function gets executed when we need it
    - The way lamda works is we define a `handler` function and that function will get called when a specified event occurs
    - Types of events:
        - API Gateway request
        - S3 Upload
        - AWS SNS notification
        - And many more
- SQS: Simple Queue Service
    - An AWS Messaging Queue
- SNS: Simple Notification Service
    - Fully managed messaging service for both application-to-application and application-to-person
    - Allows you to create a topic and then allows you to create subscriptions to that topic
        - Any time a message is published to the topic, all subscribers recieve that message
- Route 53
    - Domain Name System (DNS) Service
    - Resolve "hostnames" as specific IP Addresses
- AMI: Amazon Machine Image
    - Blueprints for the OSes used by EC2s
    - OS: Operating System
        - Software that is used to interface between low-level hardware and user actions
    - Image
        - Blueprint for Operating System
        - Same association between Images and OSes as Classes and Objects
    - AMI's are different images to create different Operating Systems for your EC2s
        - A ton of different ones
            - Different varieties of linux, mac, and Windows
        - There are some Amazon specific varieties of Linux
        - In particular, Amazon has their own version of Linux, which is a CentOS distribution
            - Amazon Linux 2 AMI
- IAM: Identity & Access Management
    - Role-based permissions/security service
    - Can configure different roles
        - Revature might have different roles for departments
            - Admin
            - Trainers
            - QC
            - Staging
    - One high level AWS account for an entire organization
        - Individuals will have sub-users (IAM users) with corresponding roles and permissions
            to access certain kinds of services
    - This is the service we used to create a programmatic user
        - The credentials are used by our application to send requests to DynamoDB
    - We generally create a group, and we attach permission policies to them
        - These can be pre-created by AWS that we can use
            - Such as AWSDynamoDBFullAccess
        - Or we can create our own policies
            - [Reference Docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)
            - In general, policies consist of Statements
            - Each Statement would have
                - Effect (Allow or Deny)
                - Principal (optional depending on the type of IAM policy you create)
                    - If we attach policies to groups, we do not need this
                    - But this would allow us to specify specific users that this statement applies to
                - Action
                    - A list of actions that are being allowed or denied
                    - This list can be very granular, and may take some time to explore which actions are needed for different scenarios
                - Resource (optional depending on the type of IAM policy you create)
                    - We do need to specify this for policies attached to groups
                    - It specifies which resources the statement applies to
                - Condition
                    - We can specify conditions for whether this statement will actually take effect
    - A `Role` is basically a Group, but for a service instead of a user
- SG: Security Groups
    - Set of rules defining how traffic is filtered
    - What IPs are allowed to access my RDS or EC2?
    - What IPs are my RDS and EC2 allowed to response TO?
- VPC: Virtual Private Cloud
    - Private configuration for all of the services within an AWS account
    - Your own private section of the cloud

## Global Location Categorizations
- Region: A discrete physical location at which a cloud provider has set up services
- Availability Zone: A separate but connected data-center within a region

# Auto-Scaling
- The idea that we want to automatically scale the amount of resources at our disposal
- Very powerful and helpful in Industry
- But on a personal level, could accidentally accrue a lot of cost
- Vertical vs Horizontal Scaling
    - Vertical Scaling: Increase the power of an instance/server
    - Horizontal Scaling: Increase the number of instances/servers
    - In older days, Vertical Scaling was primarily used
        - It took a lot of time to provision and configure new servers
    - In modern days, companies such as Amazon have setup really convenient ways
        to provision new servers
        - This has opened the door to Horizontal Scaling

Generally speaking, vertical scaling becomes more expensive the higher scale you go. This becomes inefficient. Which makes Horizontal Scaling generally more efficient money-wise.

Even small comapnies must now be prepared to scale their products globally. This of course has many challenges. But since that is where the demand is, that is where the money is.

## Cloud Models

### Software Infrastructure Components
1. Application
2. Data
3. Runtime Environment
4. Middleware
5. Operating System
6. Virtualization
7. Servers
8. Storage
9. Networking

Different Cloud Models that offer different portions of the Software Infrastructure Components
    as a Service
- Software as a Service (SaaS)
    - Provides everything from 1 - 9
    - Ex: Google Docs, Microsoft Office 365, SonarCloud, Salesforce, Dropbox, Zoom
    - Consumers: End Users
- Platform as a Service (PaaS)
    - Provides everything from 3 - 9
    - Allows hosting of application/data while bypassing all of the runtime environments and middleware that is handled for you
    - Ex: AWS Elastic Beanstalk, Heroku, "Microsoft Azure App Service", AWS Lambda
    - Consumers: Developers
- Infrastructure as a Service (IaaS)
    - Provides everything from 5 - 9
    - Ex: AWS EC2
    - Consumers: SREs, System Administrators, (Sometimes regular developers)
- Not exhaustive
    - Database as a Service
        - RDS, DynamoDB
        - Depending on the implementation, is not that different from Infrastructure as a Service
            - RDS uses EC2 under the hood
    - Functions as a Service
        - Pretty much just PaaS but specifically talking about services like AWS Lambda