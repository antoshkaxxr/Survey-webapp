import './TextQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function TextQuestion({ questionInfo, answer, setAnswer,
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
            <textarea
                id={questionInfo.questionId}
                className={'text-input'}
                rows={5}
                placeholder={'Введите текст...'}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                style={{background: backgroundColor}}
            />
        </BaseQuestion>
    );
}
