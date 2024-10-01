import { ChangeEvent, useEffect, useState } from 'react';
import '../question-style.css';
import './custom-radio.css';

type SingleChoiceQuestionProps = {
    question: string;
    options: string[];
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

function SingleChoiceQuestion({ question, options, questionId, onAnswerChange, reset }: SingleChoiceQuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setSelectedOption(answer);
        onAnswerChange(questionId, question, answer);
    };

    const handleClearSelection = () => {
        setSelectedOption(null);
        onAnswerChange(questionId, question, '');
    };

    useEffect(() => {
        if (reset) {
            setSelectedOption(null);
        }
    }, [reset]);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            {options.map((option, index) => (
                <label key={index} className={'radio-label'}>
                    <input
                        type="radio"
                        className={'custom-radio'}
                        id={`${questionId}-option-${index}`}
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                    />
                    <span className={'radio-value'}>{option}</span>
                </label>
            ))}
            {selectedOption && (
                <button onClick={handleClearSelection} className={'clear-button'}>
                    Очистить выбор
                </button>
            )}
        </div>
    );
}

export default SingleChoiceQuestion;
