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
                <>
                    <label className={'radio-label'}>
                        <input
                            type="radio"
                            className={'custom-radio'}
                            id={`${questionId}-option-${index}`}
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => setSelectedOption(option)}
                        />
                        <span className={'radio-value'}>{option}</span>
                    </label>
                </>
            ))}
        </div>
    );
}

export default SingleChoiceQuestion;
