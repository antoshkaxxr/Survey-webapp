import { useState } from 'react';
import '../question-style.css'
import './custom-radio.css'

type SingleChoiceQuestionProps = {
    question: string;
    options: string[];
    questionId: number;
}

function SingleChoiceQuestion({question, options, questionId}: SingleChoiceQuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            {options.map((option, index) => (
                <div className={'option-container'} key={option}>
                    <input
                        type="radio"
                        className={'custom-radio'}
                        id={`${questionId}-option-${index}`}
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                    />
                    <label htmlFor={`${questionId}-option-${index}`} className={'option-label'}>{option}</label>
                </div>
            ))}
        </div>
    );
}

export default SingleChoiceQuestion;
