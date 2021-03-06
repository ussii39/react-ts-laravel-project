import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserisSignIn, getUsername, getUsertoken } from "./redux/selectors";
import { GetloginUser, signIn, signout } from "./redux/operations";

export const Login = () => {
  const urlParamStr = window.location.pathname.split("/verify/")[1];
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const user = getUsername(selector);
  const isSignIn = getUserisSignIn(selector);
  const token = getUsertoken(selector);

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setemail(value);
  };

  const InputPassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const SendEmail = (email) => {
    axios
      .post("/api/register/", email, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  // const FormData = () => {
  //   axios
  //     .post("http://localhost:8001/api/login", {
  //       email,
  //       password,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  const getUser = () => {
    axios.get("/api/login", { params: { token: token } }).then((res) => {});
  };

  // const logout = () => {
  //   const tokens = window.localStorage.getItem("token");
  //   console.log(tokens);
  //   axios
  //     .post("/api/logout", "", {
  //       headers: {
  //         Authorization: `Bearer ${token} `,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data, "ログアウトしました");
  //       localStorage.clear();
  //       getUser();
  //     });
  // };

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

  return (
    <div>
      <div>
        <Link to={"/main"}>メインページへいく</Link>
      </div>
      ログインページです
      <div>あなたのパスコードは{urlParamStr}です</div>
      <input type="email" onChange={handleInput} />
      <button
        onClick={() => {
          SendEmail(email);
        }}
      >
        送信
      </button>
      <form name="contact" action="POST" data-netlify="true">
        <input
          type="email"
          name="form-name"
          placeholder="メールアドレスを入力してください"
          onChange={handleInput}
        />
        <input
          type="password"
          name="form-name"
          placeholder="パスワードを入力してください"
          onChange={InputPassword}
        />
      </form>
      <button
        onClick={() => {
          dispatch(signIn(email, password));
        }}
      >
        送信
      </button>
      <button
        onClick={() => {
          getUser();
        }}
      >
        ユーザー取得
      </button>
      <button
        onClick={() => {
          dispatch(signout());
        }}
      >
        ログアウト
      </button>
      {token ? <div>ログインしています</div> : <div>ログアウトしています</div>}
    </div>
  );
};
