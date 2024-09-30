import { useState, ChangeEvent } from 'react';
import '../question-style.css';
import './custom-number.css';

type NumberQuestionProps = {
    question: string;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
}

function NumberQuestion({ question, questionId, onAnswerChange }: NumberQuestionProps) {
    const [answer, setAnswer] = useState<string>(''); // Инициализируем как пустую строку

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answerValue = event.target.value;
        setAnswer(answerValue); // Сохраняем строку
        onAnswerChange(questionId, question, answerValue); // Передаем строку
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
