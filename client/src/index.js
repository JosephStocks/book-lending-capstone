import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Home from "./Home";
import BaseLayout from "./components/layout/BaseLayout";
import reducer from "./redux/reducers/baseReducer";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookSearch from "./components/BookSearch";
import PersonalPage from "./components/PersonalPage";
import About from "./components/About";
import Friends from "./components/Friends";
import "./styles/app.scss";

const saveToLocalStorage = (reduxGlobalState) => {
  //serialization = converting js object to a string
  try {
    const serializeState = JSON.stringify(reduxGlobalState);
    localStorage.setItem("state", serializeState);
  } catch (e) {
    console.log(e);
  }
};

const loadFromLocalStorage = (params) => {
  const serializeState = localStorage.getItem("state");

  if (serializeState === null) {
    return undefined;
  } else {
    return JSON.parse(serializeState); //returns JS object representing local storage
  }
};

const persistedState = loadFromLocalStorage();

//initializing redux store
//requires reducer, second arg is DevTools
let store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={BookSearch} />
            {/* <ProtectedRoute path="/personal" component={PersonalPage} /> */}
            <Route path="/personal" component={PersonalPage} />
            <Route path="/about" component={About} />
            <Route path="/friends" component={Friends} />
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
