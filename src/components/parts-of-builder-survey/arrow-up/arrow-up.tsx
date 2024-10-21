import React from "react";

interface ArrowUpProps {
    index: number;
    questions: SurveyQuestion[];
    setQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
}

export default function ArrowUp({index, questions, setQuestions}: ArrowUpProps) {
    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newQuestions = [...questions];
        [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
        setQuestions(newQuestions);
    };

    return (
        <button onClick={() => handleMoveUp(index)} disabled={index === 0}>
            <img src="/icons/arrow-up-circle.svg" alt="Переместить вверх"/>
        </button>

    );
}
