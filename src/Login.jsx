import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const Login = () => {
  const urlParamStr = window.location.pathname.split("/verify/")[1];
  useEffect(() => {
    console.log(urlParamStr);
  });
  return (
    <div>
      ログインページです
      <div>あなたのパスコードは{urlParamStr}です</div>;
    </div>
  );
};
