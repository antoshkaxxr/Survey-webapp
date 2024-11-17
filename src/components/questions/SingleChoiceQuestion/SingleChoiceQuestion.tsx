import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";
import './SingleChoiceQuestion.css';

export function SingleChoiceQuestion({ questionInfo, answer, setAnswer,
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
            {questionInfo.options && questionInfo.options.map((option, index) => (
                <label key={index} className={'radio-label'}>
                    <input
                        type="radio"
                        className={'custom-radio'}
                        id={`${questionInfo.questionId}-option-${index}`}
                        value={option}
                        checked={answer === option}
                        onChange={(event) => setAnswer(event.target.value)}
                    />
                    <span
                        className={'radio-value'}
                        style={{color: textColor}}
                    >
                        {option || `Вариант ${index + 1}`}
                    </span>
                </label>
            ))}
        </BaseQuestion>
    );
}
