import React from "react";
import './BaseQuestion.css';

interface BaseQuestionProps {
    question: string;
    children: React.ReactNode;
    answer: string;
    handleClear: () => void;
    isRequired: boolean;
    questionColor: string;
    textColor: string;
    imageUrl: string | undefined;
}

export function BaseQuestion({ question, children, answer, handleClear, isRequired,
                                 questionColor, textColor, imageUrl} : BaseQuestionProps) {
    return (
        <div className={'question-border'} style={{ background: questionColor }}>
            <h3 className={'question-wording'} style={{ color: textColor }}>{question} {isRequired && '*'}</h3>
            {imageUrl && (
                <div className="image-container">
                    <img
                        src={imageUrl}
                        alt="Картинка к вопросу"
                        className="question-image"
                    />
                </div>
            )}
            {children}
            {answer !== '' && (
                <div className="clear-button-container">
                    <button
                        onClick={handleClear}
                        className={'clear-button'}
                        style={{ color: textColor }}
                    >
                        Очистить ответ
                    </button>
                </div>
            )}
        </div>
    );
}
