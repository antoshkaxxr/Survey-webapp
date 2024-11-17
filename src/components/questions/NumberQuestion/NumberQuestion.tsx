import './NumberQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function NumberQuestion({ questionInfo, answer, setAnswer,
                                 backgroundColor, questionColor, textColor }: QuestionProps) {
    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={answer}
            handleClear={() => setAnswer('')}
            isRequired={questionInfo.isRequired}
            questionColor={questionColor}
            textColor={textColor}
        >
            <input
                type={'number'}
                id={`${questionInfo.questionId}`}
                className={'number-input'}
                placeholder={'Введите число...'}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                style={{background: backgroundColor}}
            />
        </BaseQuestion>
    );
}
