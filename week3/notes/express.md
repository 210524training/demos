# Express
Express is a "fast unopinionated minimalist web framework for Node.js".

## Why do we need a web framework and what is a web framework?
It would be really annoying if we had to redesign an entire web server ourselves. As in, designing the logic to receive network requests and translate them into JavaScript objects, and then vice versa for the response.
Having to implement all of the little bits of http , creating the headers, the body, and dealing with the network layer, is tedious.
A web framework is just that someone else has already done this for us.

Express is unopinionated, it only deals with the web framework, you set up your application the way you see fit.

### Quick aside into Java landscape
In Java, we have a web framework called Spring Boot. Spring Boot is a *very* opinionated framework.
This means it makes a lot of decisions about how your app is set up, configured, and ran, for you.
You just fill out the portions that the framework can't.

## Middleware
Software that intercedes on your behalf to accomplish some kind of goal that the base software does not.

### Some popular express middleware
body-parser, cookie-parser, and express-session middleware (conflicts with cookie-parser)
Body-parser will parse the body of a request as some format (in our case, JSON) into a JS object for you automatically.
Body-parser in particular is generally packaged within Express itself. `express.json()` instead of `bodyParser.json()`.
This is not always the case for all versions of Express. From versions `4.0.0` to `4.15` inclusive, body-parser was not included

cookie-parser will parse cookies from the browser and allow you to create them.

express-session will manage a session. Can interact poorly with cookie-parser, as it does its own cookie processing.

## Sessions
A continuing relationship between the server and client, so they won't be logged out every time they refresh the page.

HTTP is stateless. There's no real way for a request to save information from a previous request barring some external solution.

How do we save whether or not we're logged in, and what we're doing?
1. Uniquely identify the user
2. Save information in an object on the server that we can use to look the user up
    - We can use a map-like structure
    - Similar to Stack or Queue, a Map is a common Data Structure
    - It is generally just key-value pairs
    - If you know Python, it is called a "Dictionary"
3. Find some way to associate the identity information with each HTTP Request

One idea is that browsers have local storage, so we could embed data directly in the browser.
Some potential conflicts can arise when different web pages try to save data in the same place/name.

Browsers support an independent session architecture. Associated with this, the browser has session storage.

### How to save that identity information on each Request
1. URL Rewriting

Physically alter the url of the webpage to include information (such as a session ID) about the user

If the user navigates away, we lose the URL, and they will have to reauthenticate as the ID will have been lost

2. Hidden Form Fields

Add a hidden form field that contains the session ID for the user that gets submitted whenever the user submits a form.

If the user navigates away from the webpage, or doesn't submit a form, they will have to reauthenticate as the ID will have been lost.

3. Cookies

Small piece of information stored on your browser that gets sent to the server (specifically the server associated with the cookie) with every request that is made.

By default, the browser only sends a cookie to the server that created it.

Stored in the browser. Doesn't go away until cookies are cleared.