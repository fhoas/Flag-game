import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionsCountry from "./pages/QuestionsCountry";
import QuestionsFlag from "./pages/QuestionsFlag";
import Landing from "./pages/Landing";
import Results from "./pages/Results";
import { fetchData } from "./redux/dataSlice";
import QuestionsCapital from "./pages/QuestionsCapital";
import QuestionsBorders from "./pages/QuestionsBorders";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/questions-country" element={<QuestionsCountry />} />
        <Route path="/questions-flag" element={<QuestionsFlag />} />
        <Route path="/questions-capital" element={<QuestionsCapital />} />
        <Route path="/questions-borders" element={<QuestionsBorders />} />
        <Route path="/results" element={<Results />} />
        /questions-borders
      </Routes>
    </BrowserRouter>
  );
}

export default App;
