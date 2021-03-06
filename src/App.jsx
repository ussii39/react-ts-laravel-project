import React, { FC, useCallback, useRef, useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Link, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import { About } from "./About";
import { AnswerSpace } from "./AnswerSpace";
import { Question } from "./Question";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getUserisSignIn, getUsername, getUsertoken } from "./redux/selectors";
import { Route, Redirect } from "react-router";

function App() {
  const [todos, Settodos] = useState([]);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUsername(selector);
  const isSignIn = getUserisSignIn(selector);
  const token = getUsertoken(selector);

  useEffect(() => {
    console.log(token);
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/verify/:slug" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/question" component={Question} />
        <Route exact path="/main" component={AnswerSpace} />
        <div className="App">
          <div>
            {todos.map((todo, index) => (
              <div key={index}>
                <div>{todo.name}</div>a
              </div>
            ))}
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
