import {SingleChoiceQuestion} from "../SingleChoiceQuestion/SingleChoiceQuestion.tsx";

export function YesNoQuestion({questionInfo, onAnswerChange, isRequired, reset}: QuestionProps) {
    questionInfo.options = ['Да', 'Нет'];
    return (
        <SingleChoiceQuestion
            questionInfo={questionInfo}
            onAnswerChange={onAnswerChange}
            reset={reset}
            isRequired={isRequired}
        />
    );
}
