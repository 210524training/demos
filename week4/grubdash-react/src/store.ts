import { AnyAction } from 'redux';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';

// const store = createStore(
//   state,
//   composeWithDevTools(
//     applyMiddleware(thunk),
//   ),
// );

const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

// The RootState includes EmptyObject because we do not have any preloaded state
export type RootState = ReturnType<typeof store.getState>;

// This is the proper typing of the Dispatch object so that
// we have static type analysis on the exact actions we are allowed to dispatch
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;