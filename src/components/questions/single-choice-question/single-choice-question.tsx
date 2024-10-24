import { ChangeEvent, useEffect, useState } from 'react';
import '../question-style.css';
import './custom-radio.css';

export function SingleChoiceQuestion({ questionInfo, onAnswerChange, reset }: QuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setSelectedOption(answer);
        onAnswerChange(questionInfo.questionId, questionInfo.question, answer);
    };

    const handleClearSelection = () => {
        setSelectedOption(null);
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    useEffect(() => {
        if (reset) {
            setSelectedOption(null);
        }
    }, [reset]);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{questionInfo.question}</h3>
            {questionInfo.options && questionInfo.options.map((option, index) => (
                <label key={index} className={'radio-label'}>
                    <input
                        type="radio"
                        className={'custom-radio'}
                        id={`${questionInfo.questionId}-option-${index}`}
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
