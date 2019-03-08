import { combineReducers } from "redux";
import messageReducer from "./messageReducer";

// Use rootreducer if expecting more individual reducers.
// In this case it wasn't necessary
export default combineReducers({
  messages: messageReducer
});
