import {
  createStore,
  applyMiddleware
  // compose
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
    // compose(
    //   applyMiddleware(thunk),
    //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
  );
}

// Uncommment the above and comment the applyMiddleware(thunk) one
// to use Redux DevTool.
// For some reason it doesn't work when I open the app in two
// browsers, that's why iit is commented
