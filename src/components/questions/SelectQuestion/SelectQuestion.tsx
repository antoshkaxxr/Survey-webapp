import './SelectQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function SelectQuestion({ questionInfo, answer, setAnswer,
                                 backgroundColor, questionColor, textColor }: QuestionProps) {
    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={answer}
            handleClear={() => setAnswer('')}
            isRequired={questionInfo.isRequired}
            questionColor={questionColor}
            textColor={textColor}
            imageUrl={questionInfo.imageUrl}
        >
            <select
                className={'option-select'}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                style={{background: backgroundColor}}
            >
                <option value="" disabled>Выберите ответ</option>
                {questionInfo.options && questionInfo.options.map((option, index) => (
                    <option id={`${questionInfo.questionId}-option-${index}`} key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </BaseQuestion>
    );
}
