import React, { useEffect, useRef, useState } from "react";
import { QuestionArrays } from "./Questions";
import axios from "axios";
import "./Question.css";
import Circle from "react-circle";
import { useDispatch, useSelector } from "react-redux";
import { getUserisSignIn, getUsername, getUsertoken } from "./redux/selectors";
import { Route, Redirect } from "react-router";

export const Question = ({ children, props }) => {
  const [MyAnswer, setMyAnswer] = useState("");
  const [AnswerStatus, setAnswerStatus] = useState([]);
  const [Value, setValue] = useState([]);
  const [progress, setProperty] = useState("");

  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUsername(selector);
  const isSignIn = getUserisSignIn(selector);
  const token = getUsertoken(selector);

  const handleInput = (e) => {
    setMyAnswer(e.target.value);
  };
  useEffect(() => {
    getAnswerStatus();
  }, []);

  useEffect(() => {
    setProperty(ChartPercent);
  });

  // const SubmitAnswer = (MyAnswer,quesId) => {
  //   const AnswerId = Value.map((val)=> val.id === quesId)
  //   const data = { answer: MyAnswer,completed };
  //   axios
  //     .put(`/api/answer/${AnswerId}`, data, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((res) => {
  //       const answerStatus = res.data;
  //       console.log(answerStatus);
  //       answerStatus.forEach((answer) => {
  //         QuestionArrays.forEach((que) => {
  //           if (answer.completed === 0 && answer.id === que.id) {
  //             return (answer.completed = 1);
  //           }
  //         });
  //       });
  //       return setAnswerStatus((prev) => {
  //         return [...prev, ...answerStatus];
  //       });
  //     });
  // };

  const ResetCompleted = (id) => {
    const ResetValue = Value.find((val) => val.id === id);
    const ResetId = ResetValue.id;
    console.log(ResetId);
    const completedData = { completed: 0 };
    axios
      .put(`/api/answer/${ResetId}`, completedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        getAnswerStatus();
        console.log(res.data);

        setValue([res.data]);
      });
  };
  const Progression = Value.filter((value) => value.completed == 1).length;

  const ProGressPercentOfQuestionArrays = QuestionArrays.map(
    (question) => question.id
  ).length;
  var result01 = Progression / ProGressPercentOfQuestionArrays;
  var n = 2; // 小数点第n位まで残す
  var result02 = Math.floor(result01 * Math.pow(10, n)) / Math.pow(10, n);
  const ChartPercent = result02 * 100;

  const SubmitAnswer = (MyAnswer, quesId) => {
    const GetAnswerId = Value.find((val) => val.id === quesId);
    let AnswerId = GetAnswerId.id;
    const secondData = { completed: 1 };
    const data = { answer: MyAnswer };
    axios
      .post("/api/answer", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((res) => {
        console.log(res.data);
        const ResData = res.data;
        const resId = ResData.map((va) => {
          return va.id;
        });
        console.log(resId);
        if (resId == quesId) {
          axios
            .put(`/api/answer/${AnswerId}`, secondData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            })
            .then((res) => {
              getAnswerStatus();
              console.log(res.data);
              const CompletedStatus = [res.data];
              setAnswerStatus(CompletedStatus);
            });
        }
        inputRef.current.value = "";
        setProperty(ChartPercent);
      });
  };

  const getAnswerStatus = () => {
    axios
      .get("/api/answer", "", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        setValue(response.data);
      });
  };

  return (
    <div className="Question-container">
      {token ? (
        <Circle
          animate={true} // アニメーションをつけるかどうか
          size={250} // 円の大きさ
          lineWidth={14} // 円の線の太さ
          progress={progress} // 進捗（％）
          progressColor="cornflowerblue"
          進捗部分の色
          bgColor="whitesmoke" //円の進捗部分以外の色
          textColor="hotpink" //テキスト部分の色
          textStyle={{
            font: "bold 5rem Helvetica, Arial, sans-serif", // テキスト部分のスタイル
          }}
          percentSpacing={10} // %と数値部分の余白
          roundedStroke={true} // 円の進捗部分に丸みをもたせるかどうか
          showPercentage={true} // 進捗数値部分を表示させるかどうか
          showPercentageSymbol={true} // 進捗の%部分を表示させるかどうか
        />
      ) : null}
      <div>
        {QuestionArrays.map((ques, index) => (
          <div key={ques.id}>
            {!token ? (
              <div>表示する内容がありません</div>
            ) : (
              <div className="question-area">
                {ques.question1}
                {ques.question2}
                {ques.question3}
                {ques.question5}
                <input
                  ref={inputRef}
                  className="Answer-Submit-area"
                  type="text"
                  placeholder="英文字を入れて下さい"
                  onChange={handleInput}
                />
                メソッド
                <div>
                  {AnswerStatus.map((answer, index) => (
                    <div key={answer.id}>
                      <div className="correct-answer-area">
                        {answer.completed == 1 && ques.id === answer.id ? (
                          <div className="correct-answer-text">正解です</div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      {answer.completed === 1 && ques.id === answer.id ? (
                        <button
                          onClick={() => {
                            ResetCompleted(ques.id);
                          }}
                        >
                          やり直す
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ))}
                  <button
                    className="Submit-Button"
                    disabled={!MyAnswer}
                    onClick={() => {
                      SubmitAnswer(MyAnswer, ques.id);
                    }}
                  >
                    答えを送信する
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
