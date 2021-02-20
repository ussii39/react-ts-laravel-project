import { Route, Switch, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import { Login } from "./Login";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/verify/:slug" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
