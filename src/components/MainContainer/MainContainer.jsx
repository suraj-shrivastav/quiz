import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/context";
import QuizPage from "../QuizPage/QuizPage";
import Sidebar from "../Sidebar/Sidebar";
import "./mainContainer.css";

const MainContainer = () => {
    const { data, questionNo, openSidebar, toggleSidebar, score, timeLeft, formatTime} = useContext(Context);

    return (
        <div className="Main-container">
            <div className="nav-container">
                <div className="score-board">
                    Score: {score}
                </div>
                <div>
                    {formatTime(timeLeft)}
                </div>
            </div>
            
            <div className="main" style={{ marginRight: openSidebar ? '40%' : '0' }}>
                {data[questionNo] && (
                    <QuizPage item={data[questionNo]} />
                )}
            </div>
            
            <div className={`sidebar ${openSidebar ? 'open' : ''}`}>
                {openSidebar && <Sidebar />}
            </div>
        </div>
    );
};

export default MainContainer;