# Redux

Redux is a Global State Management library. Follows the Flux Design Pattern.

## Flux Design / Workflow

There is a global "store" that contains all of the application state.

There is a sort of circular workflow in order to update the state.

There is a construct called the "dispatch" that you can use to send/submit/"dispatch" things called "actions".

These "actions" describe some change that must take place in the store.

When the store receives a change, all components that are subscribed to the store, will be updated with new values.

Actions are JavaScript objects that have a "type" property that is a string.
These objects can optionally have additional fields of your choosing.
The most common standard is to have 1 other field called "payload".

```javascript
{
  type: 'counter/increment',
  payload: {
    amount: 5
  }
}
```

The contents of the `payload` property can be whatever you need
In general, there should consistency around the contents of a payload for any given `type`.
TypeScript helps with this.

In order to help avoid typos and improve consistency on the contents of the payload,
it is common for developers to write functions that return these objects in a nicely formatted fashion.
These functions are referred to as "action creators".

```javascript
function increment(amount = 1) {
  return {
    type: 'counter/increment',
    payload: {
      amount,
    },
  }

  console.log(increment());
  console.log(increment(5));
}
```

In order for these actions to be dispatched to the store, you need access to the dispatch object/function.

```javascript
dispatch(increment(3));
```

Once an action is dispatched, it must be processed by a construct called a "Reducer".
These are functions that will "reduce" the action into a clear/concise change to apply to the store.

```javascript
function counterReducer(state, action) {
  switch(action.type) {
  case 'counter/increment': 
    return {
      ...state,
      counter: counter + action.payload.amount,
    }
  case 'counter/decrement':
    return {
      ...state,
      counter: counter - action.payload.amount,
    }
  }
}
```

These reducer functions receive the current state and the currently dispatched action
and return a new state.

It is very important to spread the state as you return, because otherwise, you will lose most of the old data.

## Redux Thunk

Redux Thunk is a library that provides Redux Middleware (similar to Express Middleware).

It allows us to create action creators that, instead of returning an object, returns a function instead.

Regular Redux cannot process functions (only action objects). So when this function reaches the redux thunk middleware, it gets invoked, and it stops processing (the function does not reach core redux).

Generally, this is great for asynchronous operations that can result in dispatching different action objects depending on the result of this asynchronous operation.

Instead of creating action creator functions, we create thunks.
Quite often, the returned function tends to be asynchronous (but it does not have to be).