import {useEffect, useState} from 'react';
import './MultipleChoiceQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function MultipleChoiceQuestion({ questionInfo, onAnswerChange, isRequired,
                                         reset, questionColor, textColor }: QuestionProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionChange = (option: string) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(opt => opt !== option)
            : [...selectedOptions, option];

        setSelectedOptions(updatedOptions);
        onAnswerChange(questionInfo.questionId, questionInfo.question, updatedOptions.join('\n'));
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
        <BaseQuestion
            question={questionInfo.question}
            answer={selectedOptions}
            handleClear={handleClearSelection}
            isRequired={isRequired}
            questionColor={questionColor}
            textColor={textColor}
        >
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
                    <span
                        className={'checkbox-value'}
                        style={{color: textColor}}
                    >
                        {option}
                    </span>
                </label>
            ))}
        </BaseQuestion>
    );
}
