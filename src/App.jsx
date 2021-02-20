import React, { FC, useCallback, useRef, useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Login } from "./Login";

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
