import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../index.css";
import { useSelector } from "react-redux";

const Landing = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [buttonClass, setButtonClass] = useState("");
  const { data } = useSelector((state) => state.data);

  function handleClickFlag() {
    setButtonClass("fade-out");
    setAnimate(true);
    setTimeout(() => {
      navigate("/questions-flag");
    }, 500);
  }

  function handleClickCountry() {
    setButtonClass("fade-out");
    setAnimate(true);
    setTimeout(() => {
      navigate("/questions-country");
    }, 500);
  }

  function handleClickCapital() {
    setButtonClass("fade-out");
    setAnimate(true);
    setTimeout(() => {
      navigate("/questions-capital");
    }, 500);
  }

  function handleClickBorders() {
    setButtonClass("fade-out");
    setAnimate(true);
    setTimeout(() => {
      navigate("/questions-borders");
    }, 500);
  }

  return (
    <CSSTransition
      in={animate}
      timeout={500}
      classNames="background"
      onEntered={() => setAnimate(false)}
    >
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1
          className={`text-7xl font-extrabold mb-10 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent ${buttonClass}`}
        >
          FLAG GAME
        </h1>
        <p className={`text-xl text-white mb-5  ${buttonClass}`}>
          Test your knowledge of world flags and have fun!
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleClickCountry}
            className={`bg-[#8F00FF] hover:bg-[#7600CC] text-white font-bold py-2 rounded border-[1px] border-[#00000027] ${buttonClass} shadow-lg hover:shadow-xl w-[250px] transition duration-300`}
          >
            FLAG
          </button>
          <button
            onClick={handleClickFlag}
            className={`bg-[#8F00FF] hover:bg-[#7600CC] text-white font-bold py-2 rounded border-[1px] border-[#00000027] ${buttonClass} shadow-lg hover:shadow-xl w-[250px] transition duration-300`}
          >
            COUNTRY NAME
          </button>
          <button
            onClick={handleClickCapital}
            className={`bg-[#8F00FF] hover:bg-[#7600CC] text-white font-bold py-2 rounded border-[1px] border-[#00000027] ${buttonClass} shadow-lg hover:shadow-xl w-[250px] transition duration-300`}
          >
            CAPITAL
          </button>
          <button
            onClick={handleClickBorders}
            className={`bg-[#8F00FF] hover:bg-[#7600CC] text-white font-bold py-2 rounded border-[1px] border-[#00000027] ${buttonClass} shadow-lg hover:shadow-xl w-[250px] transition duration-300`}
          >
            BORDERS
          </button>
        </div>
        {data && data.length > 0 && (
          <div className="flags text-[150px] fixed flex flex-wrap w-[300%] origin-top-left rotate-[12deg] opacity-25 z-[-1] animate-slide">
            {data.map((item, index) => (
              <img
                className="p-4 w-[300px] h-[200px]"
                src={item.flags.png}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

export default Landing;
