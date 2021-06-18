import { combineReducers } from "redux";
import userReducer from "./user.reducer";

// THIS FILE IS NO LONGER IN USE DUE TO REDUX TOOLKIT

const state = combineReducers({
  user: userReducer,
});

export default state;