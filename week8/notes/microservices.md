# Microservices

A service that covers only a single core functionality.

Microservices are usually described in contrast to an old legacy architecture called the "Monolith".

## Monolith

Traditional design where a service performs all application functions.

You can think about your Express Server, where all of our user stories were implemented in a single application.

If that application went down because of any single functionality, all functionality would be lost.

If we continue this architecture into an enterprise scale company/application, our code base becomes:

- Very Large
- Hard to maintain
- Hard to read
- Hard to extend
- Single point of failure (one failure in one piece costs you the entire system)
- Difficult to Scale
  - Over time, these applications become very large, which generally means they take a lot of resources to run
    - This leads primarily to vertical scaling
    - Once we have already vertically scaled, it is quite expensive to then horizontally scale

### Cons

- Bugs can cascade bringing the entire application down
- Not very flexible to change
  - Changing one part of the service might cause the entire application to become unstable
- Requires larger machines, so scaling is expensive
- Need to understand the entire codebase in order to change one small part of it or to add a new feature
- Innately requires extensive documentation
  - But documentation in its own right is not a bad thing
- The entire codebase must be written in a single language
  - If the app is initially written in JavaScript, you need to write new features in JavaScript even if it would be more suited to Python

### Pros

- All of the code is in one centralized location
- Would only need to have the entire team learn 1 core programming language
- Architecture is simple
  - You just deploy the 1 app X times
  - Set up a load balancer and point the client to it
- Easy to deploy since there is only a single application
  - You just run the single program

### Conclusion

For small applications the monolith makes sense. Deployment and maintenence is relatively easy and the cognitive overhead is lessened with a monolith architecture.

## Microservices Architecture (MSA)

A fine-grained service that relies on other services to form a single cohesive application.

Instead of our application consisting of a single program, we will break each service out into its own program. Each program runs independently, and only by working together do they form the overarching application.

Inherently maintainable (on a per-service scale), extensible, easy to scale, and fault-tolerant (sort of).

This architecture was trailblazed by Netflix. Netflix had hundreds of thousands and millions of simultaneous users, streaming data to their home networks. Netflix needed to scale to support this amount of simultaneous bandwidth. The limitations of the monolithic architecture simply is prohibitively expensive to scale to this point.

One of the biggest downsides is its complexity. Taking a single application and splitting and turning it into a distributed architecture innately provides a very significant cognitive overhead. Understanding the communication lines between thousands of different services is painfully difficult.

Often it becomes so difficult that we have dedicated teams that focus on observability of the microservice architecture. We leverage concepts such as "tracing". Where we give every new request a unique ID and include it in every communication line between services, so that we can track down all of the services that were reached by a single source request.

We also we want to be careful about many potential pitfalls.

Services generally communicate across HTTP. But each HTTP request has its own overhead and takes time.
Let's say you have a very fast network, and on average requests take only 50 ms. If you had a single request that needed to be processed by 10 separate services, then the resulting request would take half a second. The latency of resulting requests from outside the application take far too long to service.

We must design our services in a way so that we don't have to continuously hop back and forth between services. Services need to small, but big enough so that they don't have to once again reach out to another service.

Ideally, services can be small but still process requests to that service without needing to rely on any other service.

It becomes a very significant challenge to determine the service boundaries. What decisions decisions do you make to determine which features should be a service and which other features should be part of a pre-existing service? We cannot ignore this.

We also must pay very close attention to faults. If one service goes down, what happens to the others? If all of our services must definitely communicate with 10 other services, then when one goes down, all 10 go down. This is a problem.

We need to design our services with fault-tolerance in mind.

### Pros

- Scales very well
  - Each individual service does not require much processing
  - We can take a lot of advantage of horizontal scaling
  - Can be run on smaller machines allowing for more cost-efficient horizontal scaling
- If you design the architecture well, it is more stable
  - If a bug/fault occurs in one service causing a loss of service, the rest of the architecture continues to run
  - Fault-tolerant
  - We expect MSA's to fail fast, fail gracefully, and recover fast
  - Circuit Breaking
    - If something fails we give a default answer so that client at least gets something
- Changes to one service (project/repository) do not endanger other services (usually)
  - Maintainable
- Each codebase is digestible
  - Separate codebase for each service
  - Readable
- Each individual service can use the language best-suited for that use-case and your team
- Adding large new features would require adding a new service to the architecture instead of causing the entire codebase to become unstable
  - This is not to say that individual services cannot be extended
  - Extensible

### Cons

- Architecture becomes complex
  - Very complex very quickly
  - We have X services
    - Each service requires replication (horizontal scaling)
  - We often need additional services to ease communication lines
    - Gateways
    - Discovery
  - Understanding the ecosystem requires more cognitive load
- Difficult to deploy
  - We don't just have 1 program anymore
  - We now have multiple and we need to deploy all of them
  - Sometimes these need to be deployed in very different manners
  - Sometimes when one service has a change and is re-deployed, other services might also need to be re-deployed
- Communication becomes vastly more important

## Example

Let's say we have a Library application that begins as a monolith.

### Monolith

A service that accepts requests to authenticate users. Users can send requests to view, checkout, and return media. Librariants can send requests to view overdue books and assess fines on users. Users can send requests to pay their fines. Users can requests books to be brought from other branches of the library to their local branch.

### Decomposing the Monolith

In order to create a MSA we must first break up our Monolith into digestible services.

#### Take all user stories and make each into a service

- Login Service
- Logout Service
- Get Books Service
- Checkout Books Service
- Retrieve Fines Service
- etc

Issues can arise that are hard to predict because they would depend upon our user stories. It could end up being a lot of extra work due to a lot of repetition of code that might have been avoided if certain services were combined. It could have a lot of cross communication that might have been avoided, etc.

In general, it is a terribly bad approach for exactly this reason. We cannot predict what kinds issues will arise. Due to this, it is a very incorrect approach to decomposing a monolith.

#### Decompose the services based on each individual model

- User Service
- Book Service
- Author Service
- Genre Service
- Director Service
- Fine Service
- Movie Service
- etc

It is very common that user stories require interactions with multiple models. This approach will inherently have immense cross-communication between services. We effectively throw out any fault tolerance we might have wanted. And depending on how many models we have and how many are required by a single feature, we might have terribly request latency.

It's a bit better than the previous approach, because it is at least predictable, but still fairly bad.

#### Decomponse the services based on related user stories or Business Domains

- Media Service
  - Handle all functions pertaining to creating media, checkout out media, checking in media, etc
- Authentication Service
  - Logging in, updating addresses, etc
- Billing/Payments Service
  - Assessing fines, accepting payments, etc

The best approach to decomposing a monolith into a MSA.
Focus on what domains the business itself sees and how those translate to independent units.

## Other Services

If I decompose the very simple Library application above, we still have a problem.

As noted, the Media Service will likely need to be replicated many times.

As such, how many IP addresses does our client need to know about? What happens if one instance goes down and comes back up with a different IP address? What happens if the number of IP addresses is constantly changing? What if there is not even a single consistent IP address?

### Gateway Service

We need a single entry point into the architecture. Routes requests to the correct service based on the URI in the request (and sometimes other aspects like headers).

- Zuul
  - The Gatekeeper from Ghostbusters
  - Netflix OSS (Open Source Stack)
  - Java
- Zookeeper
- API Gateway
- etc

Does this solve the entire problem above? How does our Gateway know where all of our services are?

### Discovery Service

A service that allows other services to register with it and keeps track of their locations and whether or not they are currently online.

Most discovery services utilize a "heartbeat" to determine the health of the service.

- Eureka
  - Netflix OSS
  - Java
- Consul
- Zookeeper

##### Heartbeat

A request that the service sends to discovery (or vice versa) to essentially say "I'm alive" on a regular interval.

### Configuration Service

Each service requires configuration and probably multiple configurations per service (for each environment will need different configuration, such as local, test, dev, and prod).

Managing these configurations when they're distributed amongst projects can be very challenging.

A Configuration Service can help us alleviate this complexity.

It is a service that provides configuration to other services. For example, if our services need to know the location of the discovery service in order to send out their heartbeat, the configuration service can inject that information into other services.

Offers a way to centralize all of the configuration so that you can change things in one place and affect everything.

- Spring Cloud Config
  - Java
  - Part of the Spring Framework series of cloud projects
- Zookeeper
- Consul
  - A bit different from Spring Cloud Config
  - Supports similar use-cases

### Chaos Engineering

We create issues/failures (chaos in general) and see what happens to the system.

Our architectures are very complex. It is difficult to fully understand what happens when certain failure scenarios occur. So we can forcibly inject these failure scenarios and watch how the system responds. This allows to identify potential problems and fix before they happen for real.

"Throw a wrench in there and see if it survives".

#### Chaos Monkey

Created by Netflix. Literally runs in their production environment. It will just randomly shut down services _in production_ to ensure that the application is fault tolerant. Making sure that the application can detect and recover from faults.

Most companies do not run their chaos engineering in production, since the idea is to avoid downtime.

However, Netflix's perspective is that they want to ensure that they can definitely detect failures and recover well. By running this in production, any scenario that they don't detect will eventually be detected by their end users. Then it can be fixed so that future failures do not result in downtime.

#### Chaos Gorilla

Simulates an outage in an entire availability zone.

#### Armageddon Ape
Netflix has their entire stack replicated in GCP ready for deployment if AWS goes down.

Netflix says they could ready to go on Google's servers within DAYS of AWS completely shutting down.

### Scaling

As noted with our Library MSA Example, the Media Service would need to be scaled more than the Authentication Service or the Billing/Payments Service.

This is one very powerful characteristic of Microservices Architectures.

We can scale individual services independently.

In a Monolith, in order to scale our bandwidth we have to replicate the entire system at once.

The Media service would have to be scaled at the same rate as the authentication service.
And the entire system would have to be scaled according to the most used service.

In MSA, this is different. We can scale individual services exactly according to their usage.
This allows to take even more efficient advantage of our hardware.

I can have 10 replicas of the Media Service, and only 2 replicas of the Billing Service and 1 of the Authentication Service if that is how the traffic is distributed.

#### With Containerization

We're now no longer talking about individual instances, we're now talking containers running on individual machines. Since one container going down doesn't necessarily take down the instance, we canreplicate across our instances multiple containers of our services.

Given 3 EC2s:
1. 2 Media Services, 1 Authentication Service
2. 2 Media Services, 1 Payment Service
3. 1 Media Service, 1 Payment Service, 1 Authentication Service

Now even if our hardware infrastructure were to fail, our application continues to function, albeit with reduced bandwidth temporarily.

The only way the entire system could go down is if we have multiple simultaneous failures.
And then with some statistics, you could calculate your approximate service uptime/downtime.

We distribute our instances/replicas across what we refer to as "Failure Domains".

AWS Regions or Availability Zones would be a "Failure Domain". It is possible for entire availability zones to go down. It is even possible for entire AWS Regions to go down.

But the likelihood of multiple different Regions or AZs going down at the same time is very very low.

Expanding this further, it becomes more important to manage our containers more closely.

We will be creating and destroying containers constantly. The number of desired containers will constantly be in flux through the intervention of concepts like auto-scaling.

We need observability into the dynamics of containers.

### Container Orchestration

Tools that can manage containers on a large scale. Often have many different features for working with MSA applications built in (e.g. Discovery).

- Docker Swarm
  - Deprecated in favor of Kubernetes
- Kubernetes (K8s)
- AWS ECS

These types of tools allow us to manage multiple containers across many servers or "nodes" or instances such that services are dynamically made available. They often monitor the health and traffic for each service and ensures there are always enough services available.

#### Definitions

- Cluster
  - A collection of nodes with at least one Master (Control Plane) and Worker (kubelet) process
  - You would say that you have a Kubernetes Cluster that consists of 2 master nodes and 3 worker nodes
    - Multiple masters are useful in case 1 might go down
    - This ties into a concept called "Master Election"
      - If one master were to fail, the others "elect" another to become the primary master
- Pod
  - In ECS, the equivalent would be called "Tasks"
  - Smallest unit of execution in Kubernetes
  - An abstraction of an application managed by Kubernetes
  - Consists of 1 or more containers
  - Common Examples:
    - A pod with 2 containers: 1 postgres DB container and 1 service container
    - A pod with 3 containers: 1 service container, 1 log exporter container, and 1 container that registers with discovery
- Deployment
  - A declarative solution for managing Pods and ReplicaSets
    - ReplicaSet is just a term that refers to a desired set of replicas
  - You can think some microservice (just a single service from a MSA) as wanting some desired amount of replicas
  - You want this one service to have some specific configuration
  - You can organize all of that as a "Deployment"
  - Deployments can be updated with new images to represent the service
  - You can rollout changes by updating the deployment with that new image
    - But the number of replicas and configuration does not necessarily have to change
  - Up to this point "deployment" has been used more as a verb, but now with Kubernetes, it is a noun
- Service
  - In ECS, the equivalent is also called a "Service"
  - Defines a logical set of pods and a policy for accessing them
  - A means of load balancing traffic across instances
  - Multiple Pods would be part of the same Service
    - Traffic gets load balanced between them
- Node
  - A machine running either the Control Plane or Kubelet
- Control Plane
  - The set of processes that have the decision making to control the orchestration of containers
  - The logic of Kubernetes itself is mostly managed through this Control Plane
  - `kube-controller-manager`
    - Responsible for ensuring that our nodes are healthy
    - Responsible for ensuring that our pods are replicated correctly
    - Responsible for mapping our endpoints to pods
  - `kube-cloud-controller-manager`
    - Responsible for interacting with cloud platforms (such as AWS or GCP) to provision cloud resources
    - Use EC2s to provision new nodes for the Kubernetes Cluster
    - Use EBSes to create external volumes to be mounted to containers
    - etc
- `kubelet`
  - A process running on worker nodes
  - Will communicate with the Control Plane
  - Responsible for ensuring that the containers on this node are running and healthy
- Container Runtime
  - The software that Kubernetes uses to create containers
  - Has been docker in the past, but won't be in the future
    - Docker includes aspects to the software that is simply not necessary for Kubernetes
    - By packaging with Docker, we are just bloating the storage requirements on each of our nodes
    - Alternative Container Runtimes could be more performant or more secure than Docker in the Kubernetes environment
  - docker, containerd, or CRI-O
  - Docker is not the only software that works with containers and images
    - It simply happens to be the most popular

Kubernetes does offer some features that would be needed for a standard MSA without needing a dedicated service.

For example, The Kubernetes Control Plane handles health checking and mapping endpoints for you, which means you do not need a discovery service. Sort of.

As long as everything is running within a single Kubernetes Cluster, this is true.

But, some companies use multiple Kubernetes Clusters distributed around the world.
This is important, because if you have users in Japan accessing servers in Kansas, there will ridiculously bad latency.
So, companies have Kubernetes Clusters in different global regions. With this in mind, if you did need service discovery across different clusters, you would still need a dedicated service discovery solution.

And similarly for Gateways. Kubernetes has a construct called an "Ingress" that controls traffic into the cluster. And it can be configured to route traffic to different Services based on the URI or header content of he request.

### Fargate

In ECS, you define tasks and let your services deploy your tasks to the cluster. However, you have to provision your cluster of EC2s (and any autoscaling) before you've even defined your services. So you end up in a situation where you are not necessarily using all of your provisioned compute power.

Why do we care? You're paying money for something you're not using.

Fargate allows us to dynamically provision only the computing power that a task requires to run. Instead of defining a Cluster, you define a task and how much compute power and memory that task requires and instances are provisioned for you just for those tasks.

### Databases in MSA

Rather than having all of your data in a single database potentially serving as a bottleneck for your million services, you split your database.

There is a difference between replicating a database and splitting a database. And there are also different ways to split a database.

We can separate our databases according to the relevant data that each microservice needs. For example, our Media Service really doesn't need access to user data. As such, they can be separated into different databases.

This allows us to split our database across domain boundaries. Generally in line with our microservice boundaries.

Additionally, when we reach particularly large scales, we can "shard" databases. We can split a single database into multiple instances, and keep only some of the data in each one. This is much more complicated than splitting across domain boundaries. Because even related data is now distributed instead of only distributing unrelated data.

Completely separately, we can replicate databases. This increases our throughput for READ operations, but does not particularly increase our bandwidth for WRITE operations. Through the use of eventual consistency, we can support more elasticity in our WRITE bandwidth, but it doesn't necessarily increase.

Splitting our databases increases both our READ and WRITE bandwidth.

Another problem: What happens to transactions? How do we enforce a transaction as a single unit of work, when each instruction is sent to a completely different database? Even if we can, we likely cannot keep the same properties. For example, it is hard to enforce Consistency, when some part of the data may not even be up to date.

For example:

In our Library example, we have fines that are levied against individual users. However, our business considers payments and authentication to be separate domains.

As such, the location of our user data may be different from the location of our payment/billing data.
If a user were to be deleted, while at the same time we have a fine that references that user, the fine now references nothing. We have an orphaned record until and unless the delete request from the authentication/user service makes it to the payment/billing service.

Can we even have distributed transactions? It is very difficult, but it is technically possible.

And we have very different properties regarding our database.

#### BASE
- Basically Available
  - The data is usually available, but might not be accurate 100% of the time
- Soft state
  - The state of the database might be in flux
  - One command to update something might result in multiple requests to other dbs, so the state of the database is changing until those resultant commands have finished
- Eventually consistent
  - The database will eventually reach a consistent state
  - A transaction might not be complete right away because the requests need to propagate amongst the services