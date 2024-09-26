import React, { useState } from 'react';
import '../question-style.css';
import './custom-slider.css';

type SliderQuestionProps = {
    question: string;
    min: number;
    max: number;
    questionId: number;
}

function SliderQuestion({ question, min, max, questionId }: SliderQuestionProps) {
    const [value, setValue] = useState<number>(5);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <div className="slider-container">
                <span className="slider-label">{min}</span>
                <input
                    id={`${questionId}`}
                    className={'slider-input'}
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                />
                <span className="slider-label">{max}</span>
            </div>
            <div className={'slider-message'}>Выбранное значение: {value}</div>
        </div>
    );
}

export default SliderQuestion;
