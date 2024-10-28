import './QuestionButtons.css';
import {EditButton} from "../EditButton/EditButton.tsx";
import React from "react";
import {ArrowUp} from "../ArrowUp/ArrowUp.tsx";
import {ArrayDown} from "../ArrowDown/ArrowDown.tsx";
import {DeleteButton} from "../DeleteButton/DeleteButton.tsx";
import {AddButton} from "../AddButton/AddButton.tsx";

interface QuestionButtonsProps {
    index: number;
    setAddIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setSelectedQuestionType: React.Dispatch<React.SetStateAction<number>>;
    questions: SurveyQuestion[];
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTypeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
}

export function QuestionButtons({index, setAddIndex, setEditIndex, setSelectedQuestionType, questions,
                                    setInputModalOpen, setTypeModalOpen, setQuestions}: QuestionButtonsProps) {
    return (
        <div className={'question-buttons'}>
            <AddButton index={index} setAddIndex={setAddIndex} setTypeModalOpen={setTypeModalOpen}></AddButton>
            <EditButton
                index={index} setEditIndex={setEditIndex}
                setSelectedQuestionType={setSelectedQuestionType}
                questions={questions}
                setInputModalOpen={setInputModalOpen}
            />
            <ArrowUp index={index} questions={questions} setQuestions={setQuestions} />
            <ArrayDown index={index} questions={questions} setQuestions={setQuestions} />
            <DeleteButton index={index} questions={questions} setQuestions={setQuestions} />
        </div>
    );
}
