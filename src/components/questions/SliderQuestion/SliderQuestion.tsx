import './SliderQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function SliderQuestion({ questionInfo, answer, setAnswer,
                                 questionColor, textColor }: QuestionProps) {
    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={answer}
            handleClear={() => setAnswer('')}
            isRequired={questionInfo.isRequired}
            questionColor={questionColor}
            textColor={textColor}
        >
            <div className="slider-container">
                <span className="slider-label">{questionInfo.ranges![0]}</span>
                <input
                    id={`${questionInfo.questionId}`}
                    className={'slider-input'}
                    type="range"
                    min={questionInfo.ranges![0]}
                    max={questionInfo.ranges![1]}
                    value={answer !== '' ? answer : questionInfo.ranges![0]}
                    onChange={(event) => setAnswer(event.target.value)}
                />
                <span className="slider-label">{questionInfo.ranges![1]}</span>
            </div>
            <div
                className={'slider-message'}
                style={{color: textColor}}
            >
                Выбранное значение: {answer}
            </div>
        </BaseQuestion>
    );
}
