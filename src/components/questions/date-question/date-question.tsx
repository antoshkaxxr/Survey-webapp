import '../question-style.css'
import './custom-date.css'

type DateQuestionProps = {
    question: string;
    questionId: number;
}

function DateQuestion({question, questionId}: DateQuestionProps) {
    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <input
                type={'date'}
                id={`${questionId}`}
                className={'date-input'}
            />
        </div>
    );
}

export default DateQuestion;
