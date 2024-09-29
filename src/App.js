import React, { useState, useCallback, useEffect } from "react";
import { QUESTIONS } from "./questions";
import Question from "./Question";
import Results from "./Results";
// import * as persist from 'node-persist';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [runCount, setRunCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [isQuizComplete, setIsQuizCimplete] = useState(false);

  const totalQuestions = Object.keys(QUESTIONS).length;

  useEffect(() => {
    const storedRuns = parseInt(localStorage.getItem('runs') ?? '0', 10);
    const storedTotalScore = parseInt(localStorage.getItem('totalScore') ?? '0');
    // await persist.init();
    // const storedRuns = await persist.getItem('runs') || 0;
    // const storedTotalScore = await persist.getItem('totalScore') || 0;
    setRunCount(storedRuns);
    setTotalScore(storedTotalScore);

    if (storedRuns > 0) {
      setAverageScore(storedTotalScore / storedRuns);
    }
  }, []);

  const handleAnswer = useCallback((answer) => {
    setYesCount((prevYesCount) => {
      const updatedYesCount = prevYesCount + (answer ? 1 : 0);

      if (currentQuestionIndex === totalQuestions - 1) {
        // const finalYesCount = yesCount + (answer ? 1 : 0);
        const score = (updatedYesCount / totalQuestions) * 100;
        const updatedTotalScore = totalScore + score;
        const updatedRunCount = runCount + 1;

        setTotalScore(updatedTotalScore);
        setRunCount(updatedRunCount);
        setAverageScore(updatedTotalScore / updatedRunCount);

        // persist.setItem('runs', updatedRunCount);
        // persist.setItem('totalScore', updatedTotalScore);

        localStorage.setItem('runs', updatedRunCount.toString());
        localStorage.setItem('totalScore', updatedTotalScore.toString());

        setIsQuizCimplete(true);

      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
      return updatedYesCount;
    });
  },
    [currentQuestionIndex, totalQuestions, runCount, totalScore]
  );

  console.log(currentQuestionIndex)
  return (
    <div className="main__wrap">
      <main className="container">
        <div>
          {!isQuizComplete ? (
            <><h1>Current Average Score for All Runs: {averageScore.toFixed(2)}</h1>
              <Question
                question={QUESTIONS[currentQuestionIndex + 1]}
                onAnswer={handleAnswer}
              /></>
          ) : <Results
            currentScore={(yesCount / totalQuestions) * 100}
            averageScore={averageScore}
          />}

        </div>
      </main>
    </div>
  );
}

export default App;
