import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRandomItem } from "../redux/randomItemSlice";
import { setResults } from "../redux/resultsSlice";
import { useNavigate } from "react-router-dom";
import countriesData from "../data/countries.json";

// JSON verilerini bir nesneye dönüştürün
const countriesMap = countriesData.reduce((acc, item) => {
  const [code, name] = Object.entries(item)[0];
  acc[code] = name;
  return acc;
}, {});

function QuestionsBorders() {
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
    if (data.length > 0) {
      const itemsWithBorders = data.filter(
        (item) => item.borders && item.borders.length > 0
      );

      const itemsWithoutBorders = data.filter(
        (item) => !item.borders || item.borders.length === 0
      );

      if (itemsWithBorders.length === 0) {
        console.error("No countries with borders available.");
        return;
      }

      const randomIndex = Math.floor(Math.random() * itemsWithBorders.length);
      const selectedItem = itemsWithBorders[randomIndex];
      dispatch(setRandomItem(selectedItem));

      const sameRegionChoices = itemsWithBorders.filter(
        (item) =>
          item.region === selectedItem.region && item.id !== selectedItem.id
      );

      let randomChoices = [];
      while (randomChoices.length < 3 && sameRegionChoices.length > 0) {
        const randomChoiceIndex = Math.floor(
          Math.random() * sameRegionChoices.length
        );
        const randomChoice = sameRegionChoices.splice(randomChoiceIndex, 1)[0];
        randomChoices.push(randomChoice);
      }

      let incorrectChoices = [];
      while (incorrectChoices.length < 3 && itemsWithoutBorders.length > 0) {
        const randomChoiceIndex = Math.floor(
          Math.random() * itemsWithoutBorders.length
        );
        const randomChoice = itemsWithoutBorders.splice(
          randomChoiceIndex,
          1
        )[0];
        incorrectChoices.push(randomChoice);
      }

      setRandomItems(randomChoices);
      setShuffledItems(
        shuffleArray([selectedItem, ...randomChoices, ...incorrectChoices])
      );
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
          <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="text-center">
              <p className="text-2xl font-semibold text-white top-0">
                Question: {questionCounter > 10 ? 10 : questionCounter} / 10
              </p>
              <p className="text-xl text-white">Time Remaining: {timer}s</p>
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-2 text-xl mb-8 mt-8 ">
              <span className="text-xl font-bold text-white sm:text-2xl text-center">
                Which country has border these countries?
              </span>
              {randomItem.borders && Array.isArray(randomItem.borders) ? (
                randomItem.borders.length > 0 ? (
                  <p className="text-white text-center text-sm md:text-sm">
                    {randomItem.borders
                      .map((code) => countriesMap[code])
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                ) : (
                  <p>No borders available</p>
                )
              ) : (
                <p>Data is loading...</p>
              )}
            </div>

            <ul className="flex justify-center items-center flex-col w-full gap-4 flex-wrap">
              {shuffledItems.map((item) => (
                <li
                  onClick={() => handleClick(item.name)}
                  className="flex justify-center items-center bg-[#8f00ff] hover:bg-[#5a189a] text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 w-[100%] sm:w-[30%] text-xl"
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

export default QuestionsBorders;
