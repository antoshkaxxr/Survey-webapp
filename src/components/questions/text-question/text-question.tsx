import '../question-style.css'
import './custom-text.css'

type TextQuestionProps = {
    question: string;
    questionId: number;
}

function TextQuestion({question, questionId}: TextQuestionProps) {
    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <textarea
                id={`${questionId}`}
                className={'text-input'}
                rows={5}
                placeholder={'Введите текст...'}
            />
        </div>
    );
}

export default TextQuestion;
