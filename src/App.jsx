import React, { FC, useCallback, useRef, useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import { About } from "./About";

function App() {
  const [todos, Settodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://laravel-api-appliction.herokuapp.com/api/users")
      .then((res) => {
        console.log(res.data);
        Settodos(res.data);
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/verify/:slug" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />

        <div className="App">
          <div>
            {todos.map((todo, index) => (
              <div key={index}>
                <div>{todo.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
