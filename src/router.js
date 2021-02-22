import { Route, Switch, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import { Login } from "./Login";
import { Home } from "@material-ui/icons";
import { About } from "./About";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/verify/:slug" component={Login} />
            <Route exact={true} path="/home" component={Home} />
            <Route exact={true} path="/about" component={About} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
