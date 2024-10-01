import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-date.css';

type DateQuestionProps = {
    question: string;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

function DateQuestion({ question, questionId, onAnswerChange, reset }: DateQuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setAnswer(answer);
        onAnswerChange(questionId, question, answer);
    };

    const handleClearDate = () => {
        setAnswer('');
        onAnswerChange(questionId, question, '');
    };

    useEffect(() => {
        if (reset) {
            setAnswer('');
        }
    }, [reset]);

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
            {answer && (
                <button onClick={handleClearDate} className={'clear-button'}>
                    Очистить дату
                </button>
            )}
        </div>
    );
}

export default DateQuestion;
