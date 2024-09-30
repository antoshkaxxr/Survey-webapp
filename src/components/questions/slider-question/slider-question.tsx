import { useState, ChangeEvent } from 'react';
import '../question-style.css';
import './custom-slider.css';

type SliderQuestionProps = {
    question: string;
    min: number;
    max: number;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
}

function SliderQuestion({ question, min, max, questionId, onAnswerChange }: SliderQuestionProps) {
    const [value, setValue] = useState<number>(min);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        onAnswerChange(questionId, question, String(newValue));
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
