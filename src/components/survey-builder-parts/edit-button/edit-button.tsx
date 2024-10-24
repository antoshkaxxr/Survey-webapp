import React from "react";

interface EditButtonProps {
    index: number;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setSelectedQuestionType: React.Dispatch<React.SetStateAction<string | null>>;
    questions: SurveyQuestion[];
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditButton({index, setEditIndex, setSelectedQuestionType, questions, setInputModalOpen}: EditButtonProps) {
    const handleEditQuestion = (index: number) => {
        setEditIndex(index);
        setSelectedQuestionType(questions[index].type);
        setInputModalOpen(true);
    };

    return (
        <button onClick={() => handleEditQuestion(index)}>
            <img src="/icons/edit.svg" alt="Редактировать"/>
        </button>
    );
}
