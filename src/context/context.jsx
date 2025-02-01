import { createContext, useState, useEffect } from "react";

export const Context = createContext();
const ContextProvider = (props) => {
    const [data, setData] = useState([]);
    const [questionNo, setQuestionNo] = useState(0);
    const [locked, setLocked] = useState(false);
    const [score, setScore] = useState(0);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [resultData, setResultData] = useState();

    const [timeLeft, setTimeLeft] = useState(10 * 60);


    const [answers, setAnswers] = useState([
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
        console.log(answers);
    };

    const handleAnswerSelection = (item, option) => {

        if (option.is_correct) {
            console.log("Correct Answer");
            setScore(score + 1);
            console.log("Score", score);
        } else {
            console.log("Incorrect Answer");
        };

        setAnswers((prevAnswers) => [
            ...prevAnswers,
            {
                question: {
                    id: item.id,
                    option_id: option.id,
                    correct: option.is_correct,
                    solution: item.detailed_solution
                }
            }
        ]);

        setLocked(true);
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.disabled = true;
        });

    };

    const handleNextQuestion = () => {
        setQuestionNo(questionNo + 1);
        setOpenSidebar(false);
        setLocked(false);
    };

    const showSolution = (solution) => {
        // Optionally open sidebar
        // setOpenSidebar(true);
        console.log("Solution", solution);

        // Clear previous result data
        setResultData("");

        // Format the initial solution string
        let formattedResponse = solution
            .replaceAll("**", "<b>")
            .replaceAll("\r", "")
            .replaceAll("\n", "<br>")
            .replaceAll("*", "");

        // Split the formatted response into an array of lines
        let wordsArray = formattedResponse.split("<br>");

        // Join the array back into a single string for further formatting
        let newFormattedResponse = wordsArray.join("<br>")
            .replaceAll("Explanation:", "<h3>Explanation</h3>")
            .replaceAll("Additional context:", "<h3>Additional Context</h3>");

        // Update state with the new formatted response
        setResultData((prev) => [...prev, newFormattedResponse]);

        // Open sidebar to display results
        setOpenSidebar(true);

        // Log the answers and result data for debugging
        console.log("Answers", answers);
        console.log(resultData);
    };

    //timer

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    // Handle time up scenario here
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };




    //sidebar content display:

    const constextValue = {
        data,
        setAnswers,
        showAnswer,
        handleAnswerSelection,
        questionNo,
        setQuestionNo,
        handleNextQuestion,
        locked,
        setLocked,
        score,
        setScore,
        openSidebar,
        setOpenSidebar,
        showSolution,
        resultData,
        timeLeft,
        formatTime
    }
    return (
        <Context.Provider value={constextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;