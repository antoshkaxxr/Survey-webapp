import { useState, ChangeEvent } from 'react';
import '../question-style.css';
import './custom-select.css';

type SelectQuestionProps = {
    question: string;
    options: string[];
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
};

function SelectQuestion({ question, options, questionId, onAnswerChange }: SelectQuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const option = event.target.value;
        setSelectedOption(option);
        onAnswerChange(questionId, question, option);
    };

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <select
                className={'option-select'}
                value={selectedOption || ''}
                onChange={handleOptionChange}
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
