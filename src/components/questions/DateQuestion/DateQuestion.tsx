import '../BaseQuestion/BaseQuestion.css';
import './DateQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function DateQuestion({ questionInfo, answer, setAnswer,
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
            <input
                type={'date'}
                id={`${questionInfo.questionId}`}
                className={'date-input'}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                style={{background: backgroundColor}}
            />
        </BaseQuestion>
    );
}
