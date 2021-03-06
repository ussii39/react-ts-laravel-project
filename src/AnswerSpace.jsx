import React, { useEffect, useState } from "react";
import axios from "axios";
import { Question } from "./Question";
import "./AnswerSpace.css";
import { Header } from "./Header";

export const AnswerSpace = () => {
  const [answer, setanswer] = useState([]);

  //   const answerStatus = () => {
  //     AnswerStatus.map((anStatus, index) => {
  //       if (anStatus.completed == false) {
  //         const b = (anStatus.completed = 1);
  //         console.log(AnswerStatus);
  //         return b;
  //       }
  //     });
  //   };

  //   const a = AnswerStatus.map((anStatus, index) => anStatus.completed === 1);

  useEffect(() => {
    // if (a) {
    //   console.log("正解です");
    // }
  });

  const GetAnswer = () => {
    axios
      .get("https://laravel-api-appliction.herokuapp.com/api/answer")
      .then((res) => {
        setanswer(res.data);
      });
  };

  return (
    <div>
      <Header></Header>
      <div className="Question-area">
        <Question></Question>
      </div>

      <button
        onClick={() => {
          GetAnswer();
        }}
      >
        答えを見る
      </button>
      <div>
        {answer.map((ans) => (
          <div key={ans.id}>
            答えは{ans.answer}です。
            <div>
              解説
              {ans.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
