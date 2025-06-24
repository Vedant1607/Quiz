import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import getTriviaData from "../../assets/data";

const Quiz = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const options_array = [Option1, Option2, Option3, Option4];

  // Load trivia data once
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Loading trivia data...");
        
        // Skip localStorage for now to avoid potential issues
        const trivia = await getTriviaData();
        console.log("Trivia data loaded:", trivia);
        
        if (trivia && trivia.length > 0) {
          setData(trivia);
          setLoading(false);
        } else {
          setError("No trivia data received");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load trivia data: " + err.message);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Shuffle options when the index or data changes
  useEffect(() => {
    if (data.length === 0) return;

    const currentQuestion = data[index];
    if (!currentQuestion) {
      console.error("Current question is undefined for index:", index);
      return;
    }

    console.log("Current question:", currentQuestion);

    const allAnswers = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ];

    // Shuffle using Fisher-Yates algorithm
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }

    setShuffledOptions(allAnswers);
    setLock(false);

    // Reset option styles
    options_array.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.remove("correct");
        ref.current.classList.remove("wrong");
      }
    });
  }, [index, data]);

  const checkAnswer = (e, answer) => {
    if (lock) return;

    const correct = data[index].correct_answer;
    if (answer === correct) {
      e.target.classList.add("correct");
      setScore((prev) => prev + 1);
    } else {
      e.target.classList.add("wrong");
      const correctIndex = shuffledOptions.indexOf(correct);
      if (options_array[correctIndex]?.current) {
        options_array[correctIndex].current.classList.add("correct");
      }
    }

    setLock(true);
  };

  const next = () => {
    if (!lock) return;

    if (index === data.length - 1) {
      setResult(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setResult(false);
    setLock(false);
  };

  // Debug rendering
  console.log("Quiz render - loading:", loading, "error:", error, "data length:", data.length);

  if (loading) {
    return (
      <div className="container">
        <h2>Loading trivia questions...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>Error: {error}</h2>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container">
        <h2>No questions available</h2>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!result ? (
        <>
          <h2>
            {index + 1}. <span dangerouslySetInnerHTML={{ __html: data[index].question }} />
          </h2>
          <ul>
            {shuffledOptions.map((option, i) => (
              <li
                key={i}
                ref={options_array[i]}
                onClick={(e) => checkAnswer(e, option)}
                dangerouslySetInnerHTML={{ __html: option }}
              ></li>
            ))}
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      ) : (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;