import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const urlParamStr = window.location.pathname.split("/verify/")[1];

  const [email, setemail] = useState({ email: "" });

  useEffect(() => {
    console.log(urlParamStr);
  });

  const handleInput = (e) => {
    const value = e.target.value;
    setemail({ email: value });
    console.log(email);
  };
  const SendEmail = (email) => {
    axios
      .post("http://localhost:8000/api/register/", email, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      });

    // fetch(`http://localhost:8000/api/register/?email=${email}`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(email),
    // }).then((response) => {
    //   console.log(response.data);
    // });
  };

  return (
    <div>
      ログインページです
      <div>あなたのパスコードは{urlParamStr}です</div>;
      <input type="email" onChange={handleInput} />
      <button
        onClick={() => {
          SendEmail(email);
        }}
      >
        送信
      </button>
    </div>
  );
};
