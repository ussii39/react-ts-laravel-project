import { Route, Switch, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import { Login } from "./Login";
import { Home } from "@material-ui/icons";
import { About } from "./About";
import { AnswerSpace } from "./AnswerSpace";
import { Question } from "./Question";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/verify/:slug" component={Login} />
            <Route exact={true} path="/home" component={Home} />
            <Route exact={true} path="/about" component={About} />
            <Route exact={true} path="/" component={AnswerSpace} />
            <Route exact={true} path="/question" component={Question} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
