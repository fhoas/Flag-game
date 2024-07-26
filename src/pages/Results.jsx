import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/dataSlice";

const Results = () => {
  const results = useSelector((state) => state.results);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  function handleClick() {
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-white">Results</h1>
        <p className="text-3xl font-semibold text-white">{results}</p>
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
      <button
        className="bg-[#8F00FF] hover:bg-[#7600CC] text-white font-bold py-2 px-4 rounded mt-2 border-[1px] border-[#00000027] shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleClick()}
      >
        Back to menu
      </button>
    </div>
  );
};

export default Results;
