import { useState, ChangeEvent } from 'react';
import '../question-style.css';
import './custom-date.css';

type DateQuestionProps = {
    question: string;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
}

function DateQuestion({ question, questionId, onAnswerChange }: DateQuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setAnswer(answer);
        onAnswerChange(questionId, question, answer);
    };

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <input
                type={'date'}
                id={`${questionId}`}
                className={'date-input'}
                value={answer}
                onChange={handleDateChange}
            />
        </div>
    );
}

export default DateQuestion;
