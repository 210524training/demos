# HTTP

HyperText Transfer Protocol. It is a protocol to send information in some meaningful way. It is generally used to send information across the internet.

HTTP has a Request and Response. This architecture creates a sort of circular communication.

## Request

- Request Headers
    - General metadata about the request
- Request Body
    - The core information about the request
- URL
    - Destination
    - Where we are sending the request
- HTTP Version
- HTTP Method/Verb
    - Clarifying the goal of the request
    - GET
    - POST
        - Send information
    - DELETE
    - HEAD
        - Get information about the Response Headers
    - PUT
        - Used to update information
        - Specific kind of update, where we say we "replace" the data
        - This is a sort of "full" update
        - Also used in a kind of "insert/update" fashion
            - Some people might refer to this as an "upsert"
    - PATCH
        - Used to update information
        - This is a sort of "partial" update
    - TRACE
        - Used for diagnostic purposes
        - Obtain information about the path the request took to obtain a response
            - Which proxy servers/IP Addresses were used through the path of this request
        - Returns the content of the request received at the end of the request chain
            - Some proxies in the middle may modify the content of the request
            - We would want to know what the request looks like at the end
    - CONNECT
        - For establishing a 2-way communication with a server
    - OPTIONS
        - Describes the communication that the server is allowed to use
            - HTTP Methods
        - Special Method, because it is used by the browser to protect the client
        - Before any request is made to a server, the browser will send an OPTIONS request to that endpoint
            - Called "pre-flight" request
            - In addition to which HTTP methods are allowed, the browser will identify which Hosts/Web Addresses the server
                is allowed to securely communicate with
            - If the server cannot securely communicate with this request (not OPTIONS, but the other one), it will be blocked
        - This is referred to as CORS - Cross Origin Resource Sharing
        - This is a protection for the client so that it does not communicate with a potentially unsafe server
        - However, it is common for seemingly unrelated issues to present themselves as blocked by CORS
            - Sometimes this may be due to your CORS configuration, but sometimes it can be unrelated
        - There can be a lot of frustratation around resolving CORS errors
            - It can be difficult to distinguish the root cause
- Query Parameters
    - The part of the URL after a question mark '?'
    - Additional information specifying the request in some way

## Response

- Response Status Code
    - 1XX Series
        - Informational
        - Note used very often
    - 2XX Series
        - Successful
        - 200 OK
        - 201 Created
        - 202 Accepted
        - 204 No Content
    - 3XX Series
        - Redirections
        - 300 Multiple Choices
        - 301 Moved Permanently
        - 307 Temporary Redirect
        - 308 Permanent Redirect
    - 4XX Series
        - Client-Side Error
        - 400 Bad Request
        - 401 Unauthorized
        - 403 Forbidden
        - 404 Not Found
        - 418 I'm a Teapot
    - 5XX Series
        - Server Side Error
        - 500 Internal Server Error
        - 501 Not Implemented
        - 502 Bad Gateway
        - 503 Service Unavailable
- Response Body
- Response Headers
- HTTP Version

### Safe/Idempotent

These are categorizations of the HTTP Methods/Verbs based on certain characteristics.

- Safe
    - This request will not modify server data
    - GET, HEAD, TRACE, OPTIONS
    - Maybe CONNECT, depending on the implementation
- Idempotent
    - If this request were to be accidentally duplicated multiple times, there will be no impact on the server data
        - There will be difference from if you just sent 1 request
    - GET, DELETE, HEAD, PATCH, OPTIONS
    - Maybe PUT, depending on how it is used
        - The upsert functionality is less command than the normal full replace, so many consider it to be Idempotent
    - Maybe TRACE, depending on the proxies in use
        - As well as the path the request takes
    - Maybe CONNECT, depending on the implementation