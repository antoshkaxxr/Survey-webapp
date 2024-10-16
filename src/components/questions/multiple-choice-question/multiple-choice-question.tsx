import {useEffect, useState} from 'react';
import '../question-style.css';
import './custom-checkbox.css';

type MultipleChoiceQuestionProps = {
    question: string;
    options: string[];
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

function MultipleChoiceQuestion({ question, options, questionId, onAnswerChange, reset }: MultipleChoiceQuestionProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionChange = (option: string) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(opt => opt !== option)
            : [...selectedOptions, option];

        setSelectedOptions(updatedOptions);
        onAnswerChange(questionId, question, updatedOptions.join(', '));
    };

    const handleClearSelection = () => {
        setSelectedOptions([]);
        onAnswerChange(questionId, question, '');
    };

    useEffect(() => {
        if (reset) {
            setSelectedOptions([]);
        }
    }, [reset]);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            {options.map((option, index) => (
                <label key={index} className={'checkbox-label'}>
                    <input
                        type="checkbox"
                        className={'custom-checkbox'}
                        id={`${questionId}-option-${index}`}
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleOptionChange(option)}
                    />
                    <span className={'checkbox-value'}>{option}</span>
                </label>
            ))}
            {selectedOptions.length !== 0 && (
                <button onClick={handleClearSelection} className={'clear-button'}>
                    Очистить выбор
                </button>
            )}
        </div>
    );
}

export default MultipleChoiceQuestion;
