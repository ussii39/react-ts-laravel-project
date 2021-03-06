import React, { useEffect, useState } from "react";
import "./About.css";
import { TableCell } from "@material-ui/core";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserisSignIn, getUsername, getUsertoken } from "./redux/selectors";
import { signIn } from "./redux/operations";

export const About = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const user = getUsername(selector);
  const isSignIn = getUserisSignIn(selector);
  const token = getUsertoken(selector);

  const [date, setdate] = useState(["月", "火", "水", "木", "金", "土", "日"]);
  const [firstWeek, setfirstWeek] = useState([]);
  const [secondWeek, setsecondWeek] = useState([]);
  const [thirdWeek, setthirdWeek] = useState([]);
  const [forthWeek, setforthWeek] = useState([]);

  let dt = new Date();
  const month = new Date(dt.getMonth() - 1, 1);
  const lastMonth = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);

  let monthIndex = lastMonth.getDate();

  let strings = monthIndex.toString();
  let arr = [];
  for (let i = 0; i < strings; i++) {
    arr[i] = i + 1;
  }
  const newarr = [];
  arr.forEach((ar, i) => {
    const strin = ar.toString();
    newarr[i] = strin.charAt(ar.value);
  });

  const firstweek = arr.slice(0, 7);
  const secondweek = arr.slice(7, 15);
  const thirdweek = arr.slice(15, 22);
  const forthweek = arr.slice(22, 32);

  const TodayIndex = dt.getDate();
  //   const months = monthIndex.forEach((d, i) => {});

  useEffect(() => {
    console.log(newarr);
    console.log(token);
    setfirstWeek(firstweek);
    setsecondWeek(secondweek);
    setthirdWeek(thirdweek);
    setforthWeek(forthweek);
  }, []);

  const getUser = () => {
    const tokens = window.localStorage.getItem("token");
    axios
      .get("http://localhost:8001/api/login", { params: { token: tokens } })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <button
        onClick={() => {
          getUser();
        }}
      >
        ユーザー取得
      </button>
      <div className="container">
        <div className="Weeks">
          {date.map((d, i) => (
            <div key={i}>
              <div className="week-area">{d}</div>
            </div>
          ))}
        </div>
        {firstWeek.map((d, i) => (
          <div key={i} className="month-1">
            <div className="month-area">
              <div className="first-week">{d}</div>
            </div>
          </div>
        ))}
        {secondWeek.map((d, i) => (
          <div key={i} className="month-2">
            <div className="month-area">
              <div className="second-week">{d}</div>
            </div>
          </div>
        ))}
        {thirdWeek.map((d, i) => (
          <div key={i} className="month-3">
            <div className="month-area">
              <div className="third-week">{d}</div>
            </div>
          </div>
        ))}
        {forthWeek.map((d, i) => (
          <div key={i} className="month-4">
            <div className="month-area">
              <div className="forth-week">{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
