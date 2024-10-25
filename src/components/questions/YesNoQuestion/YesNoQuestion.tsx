import {SingleChoiceQuestion} from "../SingleChoiceQuestion/SingleChoiceQuestion.tsx";

export function YesNoQuestion({questionInfo, onAnswerChange, reset}: QuestionProps) {
    questionInfo.options = ['Да', 'Нет'];
    return (
        <SingleChoiceQuestion
            questionInfo={questionInfo}
            onAnswerChange={onAnswerChange}
            reset={reset}
        />
    );
}
