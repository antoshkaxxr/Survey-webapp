import { useState } from 'react';
import '../question-style.css';
import './custom-select.css'

type SelectQuestionProps = {
    question: string;
    options: string[];
    questionId: number;
};

function SelectQuestion({ question, options, questionId }: SelectQuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <select
                className={'option-select'}
                value={selectedOption || ''}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                <option value="" disabled>Выберите ответ</option>
                {options.map((option, index) => (
                    <option id={`${questionId}-option-${index}`} key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectQuestion;
