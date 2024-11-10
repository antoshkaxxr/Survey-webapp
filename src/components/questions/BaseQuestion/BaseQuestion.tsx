import React from "react";
import './BaseQuestion.css';

interface BaseQuestionProps {
    question: string;
    children: React.ReactNode;
    answer: number | string | string[] | File | null | undefined;
    handleClear: () => void;
    isRequired: boolean;
    questionColor: string;
    textColor: string;
    criticalValue?: number;
}

export function BaseQuestion({ question, children, answer, handleClear, isRequired,
                               questionColor, textColor, criticalValue } : BaseQuestionProps) {
    const isAnswerFilled = (): boolean => {
        if (typeof answer === "number") {
            return answer !== criticalValue;
        } else if (Array.isArray(answer)) {
            return answer.length !== 0;
        }

        return answer !== '' && answer !== null && answer !== undefined;
    }

    return (
        <div className={'question-border'} style={{background: questionColor}}>
            <h3 className={'question-wording'} style={{color: textColor}}>{question} {isRequired && '*'}</h3>
            {children}
            {isAnswerFilled() && (
                <button
                    onClick={handleClear}
                    className={'clear-button'}
                    style={{color: textColor}}
                >
                    Очистить ответ
                </button>
            )}
        </div>
    );
}
