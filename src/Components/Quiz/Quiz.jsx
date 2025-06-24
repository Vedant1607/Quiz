import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";

// Define the data fetching function in the same file to avoid import issues
const getTriviaData = async () => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const data = await response.json();
    if (data.response_code === 0) {
      return data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch trivia data:", error);
    return [];
  }
};

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
    let isMounted = true; // Prevent state updates if component unmounts
    
    const loadData = async () => {
      try {
        const trivia = await getTriviaData();
        
        if (isMounted) {
          if (trivia && trivia.length > 0) {
            setData(trivia);
            setLoading(false);
          } else {
            setError("No trivia data received");
            setLoading(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load trivia data");
          setLoading(false);
        }
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Shuffle options when the index or data changes
  useEffect(() => {
    if (data.length === 0 || !data[index]) return;

    const currentQuestion = data[index];
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
        ref.current.classList.remove("correct", "wrong");
      }
    });
  }, [index, data]);

  const checkAnswer = (e, answer) => {
    if (lock || !data[index]) return;

    const correct = data[index].correct_answer;
    if (answer === correct) {
      e.target.classList.add("correct");
      setScore((prev) => prev + 1);
    } else {
      e.target.classList.add("wrong");
      const correctIndex = shuffledOptions.indexOf(correct);
      if (correctIndex !== -1 && options_array[correctIndex]?.current) {
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
            {index + 1}. <span dangerouslySetInnerHTML={{ __html: data[index]?.question || "" }} />
          </h2>
          <ul>
            {shuffledOptions.map((option, i) => (
              <li
                key={i}
                ref={options_array[i]}
                onClick={(e) => checkAnswer(e, option)}
                dangerouslySetInnerHTML={{ __html: option }}
              />
            ))}
          </ul>
          <button onClick={next} disabled={!lock}>
            Next
          </button>
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