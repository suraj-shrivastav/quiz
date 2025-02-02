import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/context";
import "./StartPage.css";

const StartPage = () => {
    const { start, setStart } = useContext(Context);


    return (
        <div className={`container ${start ? "fade-out" : "fade-in"}`}>
            <button onClick={() => setStart(true)} className="start-button">
                Start Quiz
            </button>
        </div>
    );
}

export default StartPage;
