import { combineReducers } from "redux";
import userReducer from "./user.reducer";

const state = combineReducers({
  user: userReducer,
});

export default state;