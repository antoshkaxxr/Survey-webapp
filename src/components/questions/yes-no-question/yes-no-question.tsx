import SingleChoiceQuestion from "../single-choice-question/single-choice-question.tsx";

type YesNoQuestionProps = {
    question: string;
    questionId: number;
}

function YesNoQuestion({question, questionId}: YesNoQuestionProps) {
    return (
        <SingleChoiceQuestion
            question={question}
            options={['Да', 'Нет']}
            questionId={questionId}
        />
    );
}

export default YesNoQuestion;
