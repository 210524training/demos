# Steps to create Sessions using Express

1. You will need to install express and express-session. As express-session is the express middleware that provides a convenient manner to create/destroy sessions.

2. After you create your express object, you just need to use the express middleware

```typescript
import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
  // Configuration parameters
}));
```

The configuration parameters allow for some customization. One useful characteristic is in the manner in which you store session data. By default the session data is stored only in memory. And we can provide configuration to leverage an external database to retrieve/store session data.

Besides that, we configure a secret that we use to verify cookie signatures. These secrets should be secure. So in our Grubdash example, I just had the string directly. But that should be instead stored in an environment variable and read in at runtime. And kept secure like any credentials.

Along with miscellaneous cookie settings, such as whether the cookie should be HttpOnly or not.

3. Send requests

Any time a request passes through the express-session middleware, a cookie will be created, and the session will be associated with that cookie ID.

4. Associate data with the session

Inside some request endpoint, use the `req.session` object to store data

```typescript
req.session.isLoggedIn = true;

req.session.user = new User(username, password, '', '', 'Customer');
```

The above example statements will assign the `isLoggedIn` property to true as well as set the `user` property to an actual `User` object instead of `undefined`. Note that both of these are still associated with the session that has the exact session ID of the cookie as part of this request.

Every single user that has a different cookie session ID will have different session data.

5. Send further requests as desired

In each proceeding request, you can refer to the session data.

6. Destroy the session

```typescript
req.session.destroy(someCallback);
```