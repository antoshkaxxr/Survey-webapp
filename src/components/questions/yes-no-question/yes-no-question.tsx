import SingleChoiceQuestion from "../single-choice-question/single-choice-question.tsx";

type YesNoQuestionProps = {
    question: string;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

function YesNoQuestion({question, questionId, onAnswerChange, reset}: YesNoQuestionProps) {
    return (
        <SingleChoiceQuestion
            question={question}
            options={['Да', 'Нет']}
            questionId={questionId}
            onAnswerChange={onAnswerChange}
            reset={reset}
        />
    );
}

export default YesNoQuestion;
