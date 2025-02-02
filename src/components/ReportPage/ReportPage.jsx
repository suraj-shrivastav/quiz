import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/context";
import './ReportPage.css';

const ReportPage = () => {
    const { score = 0, data = [], answers = [], timeLeft, timeConsumed, formatTime, animate, setAnimate, formatTimeDisplay } = useContext(Context);

    const totalQuestions = data?.length || 0;
    const correctAnswers = score || 0;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const scorePercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    const avgTimePerQuestion = totalQuestions > 0 ? timeConsumed / totalQuestions : 0;

    

    return (
        <div className="report-container">
            <div className="report-header">
                <h1>Performance Analysis</h1>
            </div>

            <div className="report-grid">
                <div className={`stat-card ${animate ? 'highlight' : ''}`}>
                    <div className="score-circle" style={{ '--score-percentage': scorePercentage }}>
                        <span className="score-value">{scorePercentage.toFixed(1)}%</span>
                    </div>
                    <h2>Score Overview</h2>
                    <div className="stat-item">
                        <span className="stat-label">Total Questions</span>
                        <span className="stat-value">{totalQuestions}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Correct Answers</span>
                        <span className="stat-value">{correctAnswers}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Incorrect Answers</span>
                        <span className="stat-value">{incorrectAnswers}</span>
                    </div>
                </div>

                <div className={`stat-card ${animate ? 'highlight' : ''}`}>
                    <h2>Time Analysis</h2>
                    <div className="stat-item">
                        <span className="stat-label">Total Time Spent</span>
                        <span className="stat-value">{formatTimeDisplay(timeConsumed)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Time Remaining</span>
                        <span className="stat-value">{formatTimeDisplay(data.length * 60 - timeConsumed)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Avg. Time per Question</span>
                        <span className="stat-value">{avgTimePerQuestion.toFixed(1)}s</span>
                    </div>
                </div>

                <div className={`stat-card ${animate ? 'highlight' : ''}`}>
                    <h2>Performance Metrics</h2>
                    <div className="stat-item">
                        <span className="stat-label">Accuracy Rate</span>
                        <span className="stat-value">{scorePercentage.toFixed(1)}%</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Time Utilization</span>
                        <span className="stat-value">
                            {(timeConsumed + timeLeft) > 0 ?
                                ((timeConsumed / (timeConsumed + timeLeft)) * 100).toFixed(1) : '0'}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportPage;