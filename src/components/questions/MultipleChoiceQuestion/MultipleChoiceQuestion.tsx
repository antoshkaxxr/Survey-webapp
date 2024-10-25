import {useEffect, useState} from 'react';
import '../QuestionStyle.css';
import './MultipleChoiceQuestion.css';

export function MultipleChoiceQuestion({ questionInfo, onAnswerChange, reset }: QuestionProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionChange = (option: string) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(opt => opt !== option)
            : [...selectedOptions, option];

        setSelectedOptions(updatedOptions);
        onAnswerChange(questionInfo.questionId, questionInfo.question, updatedOptions.join(', '));
    };

    const handleClearSelection = () => {
        setSelectedOptions([]);
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    useEffect(() => {
        if (reset) {
            setSelectedOptions([]);
        }
    }, [reset]);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{questionInfo.question}</h3>
            {questionInfo.options && questionInfo.options.map((option, index) => (
                <label key={index} className={'checkbox-label'}>
                    <input
                        type="checkbox"
                        className={'custom-checkbox'}
                        id={`${questionInfo.questionId}-option-${index}`}
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
