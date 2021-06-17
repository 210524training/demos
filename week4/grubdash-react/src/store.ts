import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import state from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';

const store = createStore(
  state,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

// The RootState includes EmptyObject because we do not have any preloaded state
export type RootState = ReturnType<typeof store.getState>;

// This is the proper typing of the Dispatch object so that
// we have static type analysis on the exact actions we are allowed to dispatch
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, unknown, AnyAction>;

export default store;