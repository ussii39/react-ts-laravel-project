import React, { useCallback, useRef, useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

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
    <div className="App">
      <div>
        {todos.map((todo, index) => (
          <div key={index}>
            <div>{todo.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
