import { useState } from 'react';
import './QuestionButtons.css';
import {DeleteConfirmationModal} from "../../modals/DeleteConfirmationModal/DeleteConfirmationModal.tsx";

interface QuestionButtonsProps {
    index: number;
    setAddIndex: (x: number | null) => void;
    setEditIndex: (x: number | null) => void;
    setSelectedQuestionType: (x: number) => void;
    questions: SurveyQuestion[];
    setInputModalOpen: (x: boolean) => void;
    setTypeModalOpen: (x: boolean) => void;
    setQuestions: (x: SurveyQuestion[]) => void;
}

export function QuestionButtons({index, setAddIndex, setEditIndex, setSelectedQuestionType, questions,
                                    setInputModalOpen, setTypeModalOpen, setQuestions}: QuestionButtonsProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [questionToDeleteIndex, setQuestionToDeleteIndex] = useState<number | null>(null); // Состояние для хранения индекса вопроса

    const handleMoveDown = (index: number) => {
        setAddIndex(index);
        setTypeModalOpen(true);
    };

    const handleEditQuestion = (index: number) => {
        setEditIndex(index);
        setSelectedQuestionType(questions[index].type);
        setInputModalOpen(true);
    };

    const handleDeleteQuestion = (index: number) => {
        setQuestionToDeleteIndex(index);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (questionToDeleteIndex !== null) {
            const updatedQuestions = questions.filter((_, i) => i !== questionToDeleteIndex);
            setQuestions(updatedQuestions);
        }
        setIsDeleteModalOpen(false);
        setQuestionToDeleteIndex(null);
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setQuestionToDeleteIndex(null);
    };

    return (
        <>
            <div className={'question-buttons'}>
                <button onClick={() => handleMoveDown(index)}>
                    <img src="/icons/icon-add-question.svg" alt="Добавить новый вопрос перед этим"/>
                </button>
                <button onClick={() => handleEditQuestion(index)}>
                    <img src="/icons/edit.svg" alt="Редактировать"/>
                </button>
                <button onClick={() => handleDeleteQuestion(index)}>
                    <img src="/icons/trash-solid.svg" alt="Удалить"/>
                </button>
            </div>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                message="Хотите удалить этот вопрос без возможности восстановления?"
            />
        </>
    );
}
