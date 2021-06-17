import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import User from "../models/user";
import grubdashClient from "../remote/grubdash-backend/grubdash.client";
import { RootState } from "../store";

export enum UserActionTypes {
  USER_LOGIN = 'users/login',
  USER_LOGOUT = 'users/logout',
  USER_LOGIN_ASYNC_PENDING = 'users/login/async/pending',
  USER_LOGIN_ASYNC_FULFILLED = 'users/login/async/fulfilled',
  USER_LOGIN_ASYNC_REJECTED = 'users/login/async/rejected',
}

export type UserActionLogin = {
  type: UserActionTypes.USER_LOGIN,
  payload: User;
}

export type UserActionLogout = {
  type: UserActionTypes.USER_LOGOUT,
}

export type LoginCredentials = {
  username: string,
  password: string,
}

export type UserActionLoginPending = {
  type: UserActionTypes.USER_LOGIN_ASYNC_PENDING,
}

export type UserActionLoginRejected = {
  type: UserActionTypes.USER_LOGIN_ASYNC_REJECTED,
  payload: Error,
}

export type UserActionLoginFulfilled = {
  type: UserActionTypes.USER_LOGIN_ASYNC_FULFILLED,
  payload: User,
}

export type UserAction = UserActionLogin |
  UserActionLogout |
  UserActionLoginPending |
  UserActionLoginFulfilled |
  UserActionLoginRejected;

export const login: ActionCreator<UserActionLogin> = (user: User): UserActionLogin => {
  return {
    type: UserActionTypes.USER_LOGIN,
    payload: user,
  }
}

export const logout: ActionCreator<UserActionLogout> = (): UserActionLogout => {
  return {
    type: UserActionTypes.USER_LOGOUT,
  }
}

export const loginPending: ActionCreator<UserActionLoginPending> = (): UserActionLoginPending => {
  return {
    type: UserActionTypes.USER_LOGIN_ASYNC_PENDING,
  }
}

export const loginRejected: ActionCreator<UserActionLoginRejected> = (err: Error): UserActionLoginRejected => {
  return {
    type: UserActionTypes.USER_LOGIN_ASYNC_REJECTED,
    payload: err,
  }
}

export const loginFulfilled: ActionCreator<UserActionLoginFulfilled> = (user: User): UserActionLoginFulfilled => {
  return {
    type: UserActionTypes.USER_LOGIN_ASYNC_FULFILLED,
    payload: user,
  }
}

export const sendLogin: ActionCreator<
  ThunkAction<Promise<UserAction>, RootState, unknown, UserAction>
> = (username: string, password: string) => async (dispatch, getState): Promise<UserAction> => {
  dispatch(loginPending());

  try {
    const {data: user} = await grubdashClient.post<User>('/login', {
      username,
      password,
    });

    return dispatch(loginFulfilled(user));
  } catch(error) {
    return dispatch(loginRejected(error));
  }
}