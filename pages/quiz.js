import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const QuizUI = () => {
  const [questions, setQuestions] = useState([{ question: "" }]);
  const router = useRouter();
  const [disable, setDisable] = useState(false);
  const [next, setNext] = useState(true);
  const [select, setSelect] = useState(0);
  const level = router.query.level;
  let [currentquestion, setcurrentquestion] = useState(0);
  let [score, setscore] = useState(0);

  let [showScore, setShowScore] = useState(false);
  function buttonchange(option) {
    setSelect(option);
    if (questions[currentquestion].answer == option) {
      setscore(score + 1);
    }
    setNext(false);
    setDisable(true);
  }
  function nextButton() {
    if (currentquestion == 14) {
      setShowScore(true);
    } else {
      let NextQusetion = currentquestion + 1;
      setDisable(false);
      setNext(true);
      setSelect(0);
      setcurrentquestion(NextQusetion);
    }
  }
function quitbtn(){
  setShowScore(true);
}

  useEffect(() => {
    try {
      if (level) {
        axios
          .get(`https://food-quiz.p.rapidapi.com/questions/${level}`, {
            headers: {
              "X-RapidAPI-Key":
                "ad87983462msh4cc65d187bc2ca8p13b60djsn85795046d57d",
              "X-RapidAPI-Host": "food-quiz.p.rapidapi.com",
            },
          })
          .then((resp) => {
            setQuestions(resp.data);
            console.log(resp.data);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [level]);
  return (
    <div className="body">
      <div>
        <h1 className="font-semibold text-2xl">
          Welcome {router.query.name} with nice difficulty level {level}
        </h1>
      </div>
      <div className="container">
        {showScore ? (
          <>
            <div>
              <h1 className="mt-10 text-2xl font-semibold">
                Your score is {score}
              </h1>
              <button
                className="btn-next"
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="question-section">
              <h3>
                Question {currentquestion + 1} of {questions.length}
              </h3>
              <div className="question-show">
                <h4 className="question-show-content">
                  {questions[currentquestion].question}
                </h4>
              </div>
            </div>
            <div className="anser-section">
              <button
                disabled={disable}
                onClick={() => {
                  buttonchange(1);
                }}
                className={
                  select == 1 ? `bg-green-500 button_option` : `button_option`
                }
              >
                {questions[currentquestion].option1}
              </button>
              <button
                disabled={disable}
                onClick={() => {
                  buttonchange(2);
                }}
                className={
                  select == 2 ? `bg-green-500 button_option` : `button_option`
                }
              >
                {questions[currentquestion].option2}
              </button>
              <button
                disabled={disable}
                onClick={() => {
                  buttonchange(3);
                }}
                className={
                  select == 3 ? `bg-green-500 button_option` : `button_option`
                }
              >
                {questions[currentquestion].option3}
              </button>
              <div className="action-button">
                <button onClick={quitbtn} className="btn-quit">Quit</button>
                {/* {currentquestion + 1 <= questions.length - 1 && ( */}
                <button
                  disabled={next}
                  onClick={nextButton}
                  className="btn-next"
                >
                  Next
                </button>
                {/* )} */}
              </div>
            </div>
          </>
        )}
      </div>
      {/* <h3>Score={score}</h3> */}
    </div>
  );
};

export default QuizUI;
