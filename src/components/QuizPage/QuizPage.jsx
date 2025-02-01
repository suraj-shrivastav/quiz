import React, { useContext } from "react";
import { Context } from "../../context/context";
import "./quizpage.css";

const QuizPage = ({ item }) => {
    const { data, score, handleAnswerSelection, questionNo, handleNextQuestion, locked, showSolution, openSidebar, showFinalScore, formatTime, timeLeft } = useContext(Context);

    return (
        <div>
            <div className="quiz-container">
            <div className="nav-container">
                <div className="score-board">
                    Score: {score}
                </div>
                <div>
                    {formatTime(timeLeft)}
                </div>
            </div>
            <div className="question-box">
                <h3 className="question-title">{item.description}</h3>
                <div className="options-container">
                    <h4>Options:</h4>
                    <ul className={locked ? 'show-correct' : ''}>
                        {item.options.map((option) => (
                            <div key={option.id} className="option-wrapper">
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
                </div>
                <div className="button-container">
                    {questionNo !== data.length - 1 ? (
                        <button onClick={handleNextQuestion} disabled={!locked}>Next</button>
                    ) : (
                        <button onClick={showFinalScore}>Show Result</button>
                    )}
                    {!openSidebar && locked && (
                        <button id="toggleButton" onClick={() => showSolution(item.detailed_solution)}>
                            Solution
                        </button>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default QuizPage;
