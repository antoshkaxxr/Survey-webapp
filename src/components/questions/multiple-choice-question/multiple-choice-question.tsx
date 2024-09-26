import { useState } from 'react';
import '../question-style.css';
import './custom-checkbox.css';

type MultipleChoiceQuestionProps = {
    question: string;
    options: string[];
    questionId: number;
}

function MultipleChoiceQuestion({ question, options, questionId }: MultipleChoiceQuestionProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionChange = (option: string) => {
        setSelectedOptions(prevSelected =>
            prevSelected.includes(option)
                ? prevSelected.filter(opt => opt !== option)
                : [...prevSelected, option]
        );
    };

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            {options.map((option, index) => (
                <>
                    <label className={'checkbox-label'}>
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
                </>
            ))}
        </div>
    );
}

export default MultipleChoiceQuestion;
