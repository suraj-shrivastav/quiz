import { createContext, useState, useEffect } from "react";

export const Context = createContext();
const ContextProvider = (props) => {
    const [start, setStart] = useState(false);
    const [data, setData] = useState([]);
    const [questionNo, setQuestionNo] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [locked, setLocked] = useState(false);
    const [score, setScore] = useState(0);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [resultData, setResultData] = useState();
    const [finalReport, setFinalReport] = useState(false);
    const [timeConsumed, setTimeConsumed] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [animate, setAnimate] = useState(false);

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
        if (!start) return;
    
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, [start]);
    

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const showFinalScore = () => {
        setFinalReport(true);
        if (questionNo === data.length - 1) {
            setTimeConsumed(data.length * 60 - timeLeft);
            setFinalReport(true);
        }
        console.log("time consumed is: ", timeConsumed);
    }

    //report page:

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Ensure formatTime is available, provide a fallback if it's not
    const formatTimeDisplay = (time) => {
        if (typeof formatTime === 'function') {
            return formatTime(time);
        }
        // Fallback time formatter
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };


    const constextValue = {
        start,
        setStart,
        data,
        setAnswers,
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
        formatTime,
        finalReport,
        showFinalScore,
        timeConsumed,
        animate,
        setAnimate,
        formatTimeDisplay
    }
    return (
        <Context.Provider value={constextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;