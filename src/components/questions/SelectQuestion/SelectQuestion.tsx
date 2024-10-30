import {useState, ChangeEvent, useEffect} from 'react';
import './SelectQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function SelectQuestion({ questionInfo, onAnswerChange, isRequired, reset }: QuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const option = event.target.value;
        setSelectedOption(option);
        onAnswerChange(questionInfo.questionId, questionInfo.question, option);
    };

    useEffect(() => {
        if (reset) {
            setSelectedOption(null);
        }
    }, [reset]);

    const handleClearSelection = () => {
        setSelectedOption(null);
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={selectedOption}
            handleClear={handleClearSelection}
            isRequired={isRequired}
        >
            <select
                className={'option-select'}
                value={selectedOption || ''}
                onChange={handleOptionChange}
            >
                <option value="" disabled>Выберите ответ</option>
                {questionInfo.options && questionInfo.options.map((option, index) => (
                    <option id={`${questionInfo.questionId}-option-${index}`} key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {selectedOption && (
                <button onClick={handleClearSelection} className={'clear-button'}>
                    Очистить выбор
                </button>
            )}
        </BaseQuestion>
    );
}
