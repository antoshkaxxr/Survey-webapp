import React from "react";
import './BaseQuestion.css';
import {ClearButton} from "../../buttons/ClearButton/ClearButton.tsx";

interface BaseQuestionProps {
    question: string;
    children: React.ReactNode;
    answer: number | string | string[] | File | null | undefined;
    handleClear: () => void;
    isRequired: boolean;
    criticalValue?: number;
}

export function BaseQuestion({ question, children, answer, handleClear, isRequired, criticalValue } : BaseQuestionProps) {
    const isAnswerFilled = (): boolean => {
        if (typeof answer === "number") {
            return answer !== criticalValue;
        } else if (Array.isArray(answer)) {
            return answer.length !== 0;
        }

        return answer !== '' && answer !== null && answer !== undefined;
    }

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question} {isRequired && '*'}</h3>
            {children}
            {isAnswerFilled() && (
                <ClearButton handleClear={handleClear} />
            )}
        </div>
    );
}
