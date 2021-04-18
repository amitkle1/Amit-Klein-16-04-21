import listReducer from "./listReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  listReducer,
  //isSomething
});

export default allReducers;
