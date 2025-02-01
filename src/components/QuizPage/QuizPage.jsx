import React, { useContext } from "react";
import { createContext } from "react";
import { Context } from "../../context/context";
import "./quizpage.css";

const QuizPage = ({ item }) => {
    const { data, handleAnswerSelection, questionNo, handleNextQuestion, locked, score, showSolution, openSidebar } = useContext(Context);
    return (

        <>
            <div key={item.id}>
                <h2>{item.description}</h2>
                <div>
                    <h3>Options</h3>
                    <ul className={locked ? 'show-correct' : ''}>
                        {item.options.map((option) => (
                            <div key={option.id}>
                                <input
                                    type="radio"
                                    id={`option_${option.id}`}
                                    name={item.id}
                                    value={option.id}
                                    onChange={() => handleAnswerSelection(item, option)}
                                />
                                <label
                                    htmlFor={`option_${option.id}`}
                                    data-correct={option.is_correct}
                                >
                                    {option.description}
                                </label>
                            </div>
                        ))}
                    </ul>
                    <div>
                    </div>
                </div>
                {questionNo !== data.length - 1 ? <button onClick={handleNextQuestion} disabled={!locked}>Next</button> : <button>Show Result</button>}
                {!openSidebar && locked && (<button id="toggleButton" onClick={() => { showSolution(item.detailed_solution); }}>
                    Solution
                </button>
                )}

            </div>
        </>
    )
}

export default QuizPage;