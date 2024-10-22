import React from "react";

interface DeleteButtonProps {
    index: number;
    questions: SurveyQuestion[];
    setQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
}

export default function DeleteButton({index, questions, setQuestions}: DeleteButtonProps) {
    const handleDeleteQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    return (
        <button onClick={() => handleDeleteQuestion(index)}>
            <img src="/icons/trash-solid.svg" alt="Удалить"/>
        </button>
    );
}
