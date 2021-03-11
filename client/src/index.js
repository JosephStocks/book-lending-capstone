import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";

import Home from "./Home";
import BaseLayout from "./components/layout/BaseLayout";

import Login from "./components/Login";
import Registration from "./components/Registration";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookSearch from "./components/BookSearch";
import PersonalPage from "./components/PersonalPage";
import About from "./components/About";
import Friends from "./components/Friends";
import "./styles/app.scss";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={BookSearch} />
            <ProtectedRoute exact path="/personal" component={PersonalPage} />
            <Route exact path="/about" component={About} />
            <Route exact path="/friends" component={Friends} />
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
