import { useState } from 'react';
import '../choice-question.css'

type SingleChoiceQuestionProps = {
    question: string;
    options: string[];
}

function SingleChoiceQuestion({question, options} : SingleChoiceQuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            {options.map((option) => (
                <div key={option}>
                    <label className={'radio-label'}>
                        <input
                            type="radio"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => setSelectedOption(option)}
                        />
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default SingleChoiceQuestion;
