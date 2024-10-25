import './QuestionButtons.css';
import {EditButton} from "../EditButton/EditButton.tsx";
import React from "react";
import {ArrowUp} from "../ArrowUp/ArrowUp.tsx";
import {ArrayDown} from "../ArrowDown/ArrowDown.tsx";
import {DeleteButton} from "../DeleteButton/DeleteButton.tsx";

interface QuestionButtonsProps {
    index: number;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setSelectedQuestionType: React.Dispatch<React.SetStateAction<string | null>>;
    questions: SurveyQuestion[];
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
}

export function QuestionButtons({index, setEditIndex, setSelectedQuestionType, questions, setInputModalOpen, setQuestions}: QuestionButtonsProps) {
    return (
        <div className={'question-buttons'}>
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
