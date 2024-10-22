import React from "react";

interface ArrowDownProps {
    index: number;
    questions: SurveyQuestion[];
    setQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
}

export default function ArrayDown({index, questions, setQuestions}: ArrowDownProps) {
    const handleMoveDown = (index: number) => {
        if (index === questions.length - 1) return;
        const newQuestions = [...questions];
        [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
        setQuestions(newQuestions);
    };

    return (
        <button onClick={() => handleMoveDown(index)} disabled={index === questions.length - 1}>
            <img src="/icons/arrow-down-circle.svg" alt="Переместить вниз"/>
        </button>
    );
}
