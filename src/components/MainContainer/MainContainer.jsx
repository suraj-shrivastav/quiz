import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/context";
import QuizPage from "../QuizPage/QuizPage";
import Sidebar from "../Sidebar/Sidebar";
import "./mainContainer.css";
import ReportPage from "../ReportPage/ReportPage";

const MainContainer = () => {
    const { data, questionNo, openSidebar, toggleSidebar, score, timeLeft, formatTime, finalReport} = useContext(Context);

    return (
        <div className="Main-container">
            {!finalReport ?
            <>
            <div className="main" style={{ marginRight: openSidebar ? '40%' : '0' }}>
                {data[questionNo] && (
                    <QuizPage item={data[questionNo]} />
                )}
            </div>
            
            <div className={`sidebar ${openSidebar ? 'open' : ''}`}>
                {openSidebar && <Sidebar />}
            </div>
            </>
            :
            <div>
                <ReportPage/>
            </div>
            }
        </div>
    );
};

export default MainContainer;