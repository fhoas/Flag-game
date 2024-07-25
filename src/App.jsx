import React from "react";
import Questions from "./pages/Questions";
import Landing from "./pages/Landing";
import Results from "./pages/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
