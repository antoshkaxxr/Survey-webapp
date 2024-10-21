import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-date.css';

type DateQuestionProps = {
    questionInfo: Question;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

function DateQuestion({ questionInfo, onAnswerChange, reset }: DateQuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setAnswer(answer);
        onAnswerChange(questionInfo.questionId, questionInfo.question, answer);
    };

    const handleClearDate = () => {
        setAnswer('');
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    useEffect(() => {
        if (reset) {
            setAnswer('');
        }
    }, [reset]);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{questionInfo.question}</h3>
            <input
                type={'date'}
                id={`${questionInfo.questionId}`}
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
