import { createContext, useState, useEffect } from "react";

export const Context = createContext();
const ContextProvider = (props) => {
    const [data, setData] = useState([]);
    const [answers, setAnswers] = useState([
        {
            question: {
                id: 0,
                option_id: 0,
                correct: false
            }
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            //fetching data from the api, defined it the vite.config.js file.
            try {
                const response = await fetch("/api");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result.questions || []);
                console.log("Fetched Data:", result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const showAnswer = () => {
        answers.map((answer) => {
            console.log("Answer", answer.question.id, answer.question.option_id, answer.question.correct);
        });
    };

    const handleAnswerSelection = (questionId, option) => {
        setAnswers((prevAnswers) => [
            ...prevAnswers,
            {
                question: {
                    id: questionId,
                    option_id: option.id,
                    correct: option.is_correct
                }
            }
        ]);
    };


    const constextValue = {
        data,
        setAnswers,
        showAnswer,
        handleAnswerSelection,
    }
    return (
        <Context.Provider value={constextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;