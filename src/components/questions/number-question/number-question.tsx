import '../question-style.css'
import './custom-number.css'

type NumberQuestionProps = {
    question: string;
    questionId: number;
}

function NumberQuestion({question, questionId}: NumberQuestionProps) {
    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <input
                type={'number'}
                id={`${questionId}`}
                className={'number-input'}
                placeholder={'Введите число...'}
            />
        </div>
    );
}

export default NumberQuestion;
