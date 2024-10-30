import {useState, ChangeEvent, useEffect} from 'react';
import './SliderQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function SliderQuestion({ questionInfo, onAnswerChange, isRequired, reset }: QuestionProps) {
    const [value, setValue] = useState<number>(questionInfo.min || 1);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        onAnswerChange(questionInfo.questionId, questionInfo.question, String(newValue));
    };

    const handleClearSelection = () => {
        setValue(questionInfo.min || 1);
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    useEffect(() => {
        if (reset) {
            setValue(questionInfo.min || 1);
        }
    }, [reset, questionInfo.min]);

    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={value}
            handleClear={handleClearSelection}
            isRequired={isRequired}
        >
            <div className="slider-container">
                <span className="slider-label">{questionInfo.min}</span>
                <input
                    id={`${questionInfo.questionId}`}
                    className={'slider-input'}
                    type="range"
                    min={questionInfo.min}
                    max={questionInfo.max}
                    value={value}
                    onChange={handleChange}
                />
                <span className="slider-label">{questionInfo.max}</span>
            </div>
            <div className={'slider-message'}>Выбранное значение: {value}</div>
        </BaseQuestion>
    );
}
