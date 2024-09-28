import { useState, ChangeEvent } from 'react';
import '../question-style.css';
import './custom-number.css';

type NumberQuestionProps = {
    question: string;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
}

function NumberQuestion({ question, questionId, onAnswerChange }: NumberQuestionProps) {
    const [answer, setAnswer] = useState<number>();

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setAnswer(Number(answer));
        onAnswerChange(questionId, question, answer);
    };

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <input
                type={'number'}
                id={`${questionId}`}
                className={'number-input'}
                placeholder={'Введите число...'}
                value={answer}
                onChange={handleNumberChange}
            />
        </div>
    );
}

export default NumberQuestion;
