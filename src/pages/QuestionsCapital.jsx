import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRandomItem } from "../redux/randomItemSlice";
import { setResults } from "../redux/resultsSlice";
import { useNavigate } from "react-router-dom";

function QuestionsCapital() {
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
      const newDataWithId = data.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      const randomIndex = Math.floor(Math.random() * newDataWithId.length);
      const selectedItem = newDataWithId[randomIndex];
      dispatch(setRandomItem(selectedItem));

      const sameRegionChoices = newDataWithId.filter(
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

      if (randomChoices.length < 3) {
        let otherRegionChoices = newDataWithId.filter(
          (item) => item.id !== selectedItem.id && !randomChoices.includes(item)
        );
        while (randomChoices.length < 3 && otherRegionChoices.length > 0) {
          const randomChoiceIndex = Math.floor(
            Math.random() * otherRegionChoices.length
          );
          const randomChoice = otherRegionChoices.splice(
            randomChoiceIndex,
            1
          )[0];
          randomChoices.push(randomChoice);
        }
      }

      if (randomChoices.length < 4) {
        setRandomItems(randomChoices);
        setShuffledItems(shuffleArray([selectedItem, ...randomChoices]));
      } else {
        const finalChoices = shuffleArray([
          selectedItem,
          ...randomChoices.slice(0, 3),
        ]);
        setRandomItems(finalChoices);
        setShuffledItems(finalChoices);
      }
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
    if (answer === randomItem.capital) {
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
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                Question: {questionCounter > 10 ? 10 : questionCounter} / 10
              </p>
              <p className="text-xl text-white">Time Remaining: {timer}s</p>
            </div>
            <div className="text-5xl mb-8 mt-8">
              <p className="text-5xl font-bold text-white">
                {randomItem.capital}
              </p>
            </div>
            <ul className="flex justify-center items-center w-full gap-4 flex-wrap">
              {shuffledItems.map((item) => (
                <li
                  onClick={() => handleClick(item.capital)}
                  className="flex justify-center items-center bg-[#8f00ff] hover:bg-[#5a189a] text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 w-full text-xl"
                  key={item.id}
                >
                  <img
                    className="w-[40px] max-h-[40px] mr-2"
                    src={item.flags.svg}
                  />
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

export default QuestionsCapital;
