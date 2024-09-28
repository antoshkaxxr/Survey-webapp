import SingleChoiceQuestion from "../single-choice-question/single-choice-question.tsx";

type YesNoQuestionProps = {
    question: string;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
}

function YesNoQuestion({question, questionId, onAnswerChange}: YesNoQuestionProps) {
    return (
        <SingleChoiceQuestion
            question={question}
            options={['Да', 'Нет']}
            questionId={questionId}
            onAnswerChange={onAnswerChange}
        />
    );
}

export default YesNoQuestion;
