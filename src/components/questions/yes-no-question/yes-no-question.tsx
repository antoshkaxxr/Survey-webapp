import SingleChoiceQuestion from "../single-choice-question/single-choice-question.tsx";

type YesNoQuestionProps = {
    questionInfo: Question;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

function YesNoQuestion({questionInfo, onAnswerChange, reset}: YesNoQuestionProps) {
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
