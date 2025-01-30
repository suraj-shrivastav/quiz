import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { Context } from "./context/context";


function App() {
  const { data, setAnswers, showAnswer, answers, handleAnswerSelection} = useContext(Context);
  return (
    <>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <h2>{item.description}</h2>
            <p>{item.detailed_solution}</p>
            <div>
              <h3>Options</h3>
              <ul>
                {item.options.map((option) => (
                  <div key={option.id}>
                    <label>
                      <input type="radio" name={item.id} value={option.id} onChange={() => handleAnswerSelection(item.id, option)} />
                      {option.description}
                      {option.is_correct ? <span> ({option.id} {item.id} Correct)</span> : <span> ({option.id} {item.id} Incorrect)</span>}
                    </label>
                  </div>
                ))}
              </ul>
              <div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={showAnswer}>Show Answers</button>
    </>
  );
}

export default App;
