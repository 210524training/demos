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