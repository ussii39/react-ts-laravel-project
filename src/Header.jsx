import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserisSignIn, getUsername, getUsertoken } from "./redux/selectors";
import { signIn, signout } from "./redux/operations";
import { Link } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUsername(selector);
  const isSignIn = getUserisSignIn(selector);
  const token = getUsertoken(selector);
  console.log(user);
  return (
    <div>
      {token ? (
        <button
          onClick={() => {
            dispatch(signout());
          }}
        >
          ログアウト
        </button>
      ) : (
        <div>
          <Link to={"/verify/aaa"}>ログインフォームに遷移する</Link>
        </div>
      )}
    </div>
  );
};
