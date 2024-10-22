import SingleChoiceQuestion from "../single-choice-question/single-choice-question.tsx";

function YesNoQuestion({questionInfo, onAnswerChange, reset}: QuestionProps) {
    questionInfo.options = ['Да', 'Нет'];
    return (
        <SingleChoiceQuestion
            questionInfo={questionInfo}
            onAnswerChange={onAnswerChange}
            reset={reset}
        />
    );
}

export default YesNoQuestion;
