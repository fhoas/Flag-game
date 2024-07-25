import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/dataSlice";

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [buttonClass, setButtonClass] = useState("");
  const { data } = useSelector((state) => state.data);

  function handleClick() {
    setButtonClass("fade-out");
    setAnimate(true);
    setTimeout(() => {
      navigate("/questions");
    }, 500);
  }

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <CSSTransition
      in={animate}
      timeout={500}
      classNames="background"
      onEntered={() => setAnimate(false)}
    >
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className={`text-5xl font-bold mb-10 text-white ${buttonClass}`}>
          FLAG GAME
        </h1>
        <button
          onClick={handleClick}
          className={`bg-[#8F00FF] hover:bg-[#7600CC] text-white font-bold py-2 px-4 rounded border-[1px] border-[#00000027] ${buttonClass} shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          PLAY!
        </button>
        {data && data.length > 0 && (
          <div className="flags text-[150px] fixed flex flex-wrap w-[300%] origin-top-left rotate-[12deg] opacity-25 z-[-1] animate-slide">
            {data.map((item, index) => (
              <div key={index}>{item.emoji}</div>
            ))}
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

export default Landing;
