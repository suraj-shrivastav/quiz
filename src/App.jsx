import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { Context } from "./context/context";
import MainContainer from "./components/MainContainer/MainContainer";


function App() {
  const { data, setAnswers, showAnswer, answers, handleAnswerSelection} = useContext(Context);
  return (
    <>
      <MainContainer/>
    </>
  );
}

export default App;
