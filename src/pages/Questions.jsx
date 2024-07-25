import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/dataSlice";
import { setRandomItem } from "../redux/randomItemSlice";
import { setResults } from "../redux/resultsSlice";
import { useNavigate } from "react-router-dom";

function Questions() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.data);
  const randomItem = useSelector((state) => state.randomItem);
  const [randomItems, setRandomItems] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0);
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      const newDataWithId = data.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      const randomIndex = Math.floor(Math.random() * newDataWithId.length);
      const selectedItem = newDataWithId[randomIndex];
      dispatch(setRandomItem(selectedItem));
      let randomChoices = [];
      while (randomChoices.length < 3) {
        const randomChoice =
          newDataWithId[Math.floor(Math.random() * newDataWithId.length)];
        if (
          randomChoice.id !== selectedItem.id &&
          !randomChoices.includes(randomChoice)
        ) {
          randomChoices.push(randomChoice);
        }
      }
      setRandomItems(randomChoices);
      setShuffledItems(shuffleArray([selectedItem, ...randomChoices]));
    }
  }, [data, dispatch, questionCounter]);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      handleTimeout();
    }
  }, [timer]);

  useEffect(() => {
    if (questionCounter > 10) {
      dispatch(setResults(correctAnswerCounter));
      navigate("/results");
    }
  }, [questionCounter, correctAnswerCounter, dispatch, navigate]);

  const handleTimeout = () => {
    if (questionCounter < 10) {
      setQuestionCounter(questionCounter + 1);
      setTimer(10);
    } else {
      setQuestionCounter(questionCounter + 1);
    }
  };

  function handleClick(answer) {
    if (answer === randomItem.name) {
      setCorrectAnswerCounter(correctAnswerCounter + 1);
    }
    if (questionCounter < 10) {
      setQuestionCounter(questionCounter + 1);
      setTimer(10);
    } else {
      setQuestionCounter(questionCounter + 1);
    }
  }

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <>
      <div className="fixed bg-[#8f00ff] w-full h-1">
        <div
          className="h-full bg-red-600"
          style={{ width: `${(timer / 10) * 100}%` }}
        ></div>
      </div>
      <div className="flex flex-col justify-center items-center h-screen bg-[#c77dff] p-4">
        {loading && <p className="text-white text-xl">Loading...</p>}
        {error && <p className="text-red-500 text-xl">Error: {error}</p>}
        {randomItem && (
          <div className="flex flex-col justify-center items-center w-full max-w-md">
            <div className="mb-4 text-center">
              <p className="text-2xl font-semibold text-white">
                Question: {questionCounter} / 10
              </p>
              <p className="text-xl text-white">Time Remaining: {timer}s</p>
            </div>
            <div className="text-9xl mb-6">{randomItem.emoji}</div>
            <ul className="flex flex-col w-full gap-4">
              {shuffledItems.map((item) => (
                <li
                  onClick={() => handleClick(item.name)}
                  className="flex justify-center items-center bg-[#8f00ff] hover:bg-[#5a189a] text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300"
                  key={item.id}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Questions;
