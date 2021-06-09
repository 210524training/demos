# REST
- REpresentational State Transfer
    - The core idea is that we are transferring state
    - This idea is that we are ONLY doing this
    - In a traditional web-server, where companies used to send back HTML, this would NOT be considered "state"
    - We can "represent" that state in any manner of different language-agnostic forms
        - JSON or XML or YAML
        - In our case, JSON is currently the most popular
    - We represent the data on the server as "resources"
        - These could be "user" resources or "product" resources
        - Or maybe "car" resources
        - This is generally dependent upon the structure of data for your application
    - We create "endpoints" (which is just a URI, like "/users") to specify the location of our resources
    - We use the meaning or semantics of the HTTP verb to indicate what operation will take place against that resource
        - A GET request to "/users" will retrieve ALL users
        - A GET request to "/users/5" will retrieve the user with ID 5
        - A DELETE request to "/users/3" will delete the user with ID 3
            - Generally, we like embed data directly into the URI, such as the 5 or 3 in the above examples
            - These are generally referred to as "Path Parameters" or "Path Variables"
        - Generally PUT requests only go to the root URI for a resource, like "/users"
            - We don't usually use path variables here, since we can embed the ID of the resource in the body with the rest of the data
        - And similarly for POST requests
        - PATCH requests can be similar or different depending on preference
    - The idea is that the URI or endpoint specificies WHICH resource, and the Verb specifies what happens
        - In a RESTful API we do not have endpoints such as "/updateUser"
- 6 Constraints/Characteristics/Properties/Traits
    1. Stateless
        - The server should not save information about a request to use to answer future requests
        - Each request should be independent
        - If we were to use Sessions, we would technically be violating this, but it's not that bad
        - Our application can have a RESTful API in addition to some other features
            - Our RESTful API can be under the URL "/api/v1/..."
            - Our session related features can be under "/login" or "/logout", etc
    2. Cacheability or Cacheable
        - If requests for the same resource(s) are repeated/frequent, then the server should cache the data to save on some performance
            - You could use a proxy for this, but not required
            - In general, as long as can cache it in memory, so that we don't have to contact a DB, that saves a lot of time
    3. Client/Server Architecture/Relationship
        - The client/server should be able to evolve separately/independently
            - The implementation for how requests are sent or processed can be changed without impacting the other
        - The API develops a relationship with the client, generally through its uniform interface
            - It is recommended to use properties in our responses such as `url` or perhaps `href` or `links`
                to indicate what other requests can be made against this resource or similar/related resources
            - This back and forth communication develops what we call the "relationship"
    4. Uniform Interface
        - Primarily in reference to the URI structure as well as the JSON/XML responses
            - Our responses can have a different structure than our internal representation
            - This ties in to a concept called "Data Transfer Objects" or "DTOs"
            - Also ties into the consistency in which you provide those `url` or `href` or `links` attributes
        - Different requests will have similar types of responses
    5. Layered System/Architecture
        - The API can be structured as multiple servers with proxies of various kinds without impacting the manner in which it is used
        - The API should function the same regardless of how many nested servers there are in the request
    6. Code On Demand (Optional)
        - In some way/shape/form the server should be able to provide "code" that can change the manner in which the client functions
            - We might consider "code" as a resource itself
            - Send back this "code" that can be executed by the client directly
            - Might use the `window.Function` constructor to dynamically create a Function
                - Generally considered a bad practice, as it has security concerns
                - Is much safer than the even worse `eval` function, but still not ideal

## Richardson Maturity Model (RMM)
- A Mesurement of how RESTful your API is
- Leonard Richardson broke down the steps of creating a RESTful API into three steps/levels
0. Remote Procedure Calls (RPC) AKA Swamp of POX (Plain Old XML)
    - Absolute Chaos
    - No RESTful traits
    - 1 endpoint and 1 HTTP Verb in use
    - The content of the request is used to make what we refer to as "Remote Procedure Calls"
        - Have historically been XML based
    - Most of the time, the method in use is GET
        - But really could be anything
    - In addition, no attention is paid to response status codes either
        - 200 OK is often sent even under scenarios where it doesn't make sense
    - Often the perspective is that we are executing functionality instead of structured as "resources"
1. Resources
    - API is now structured as a collection of resources
    - Includes the URI naming conventions
    - But, still little attention is paid to HTTP Methods and Status Codes
2. HTTP Verb
    - Using the semantics/context of HTTP Methods appropriately
        - Using GET to retrieve info
        - Using POST to send info
        - etc
    - Properly use our Response Status Codes
3. Hypermedia Controls - HATEOAS (Hypermedia As The Engine Of Application State)
    - Hypermedia is involved in the responses
        - Providing hyperlinks to other resources to control the application state
    - Ex: Think of the Poke API, with paging and sorting feature
        - `url` attribute to reference other resources as hyperlinks
        - Alternatively create a `links` attribute
            - `href` or `src` or `url` underneath
    - Helps clients of the API to continue to work across changes

Let's say we sent an HTTP Post request to create a "Book" resource:
The response Could be:

```json
201 Created
{
    "resource": {
        "data": {
            ...
        },
        "links": [
            {
                "method": "GET",
                "href": "/books/5",
                "description": "Retrieve this newly created Book resource"
            },
            {
                "method": "DELETE",
                "href": "/books/5",
                "description": "Delete this newly created Book resource"
            },
            {
                "method": "GET",
                "href": "/author/book/5",
                "description": "Retrieve the author of this newly created Book resource"
            },
            ...
        ]
    }
}
```

The RMM is a good way to get started with creaing a RESTful API / RESTful Web Service, however it is not the end.

There are many more aspects that we can improve.

For example. HTTP is not necessarily the only protocol that we can support.
We could expand the range of HTTP Verbs that we support. We could support ALL HTTP Verbs.
You could add support for "Vary" headers, which allow you to customize responses based on other headers such as "Content-Type".
You could send back JSON, XML, YAML, or even something else.