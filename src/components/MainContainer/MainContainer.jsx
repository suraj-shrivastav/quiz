import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/context";
import QuizPage from "../QuizPage/QuizPage";
import Sidebar from "../Sidebar/Sidebar";
import "./mainContainer.css";
import ReportPage from "../ReportPage/ReportPage";
import StartPage from "../StartPage/StartPage";

const MainContainer = () => {
    const { data, questionNo, openSidebar, score, finalReport, start } = useContext(Context);

    return (
        <>
            {!start ? <StartPage />
                :
                (<div className="Main-container">
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
                            <ReportPage correct={score * 10} incorrect={100 - score * 10} />
                        </div>
                    }
                </div>)
            }
        </>
    );
};

export default MainContainer;