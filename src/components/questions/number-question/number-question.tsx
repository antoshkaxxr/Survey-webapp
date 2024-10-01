import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-number.css';

type NumberQuestionProps = {
    question: string;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

function NumberQuestion({ question, questionId, onAnswerChange, reset }: NumberQuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answerValue = event.target.value;
        setAnswer(answerValue);
        onAnswerChange(questionId, question, answerValue);
    };

    const handleClearNumber = () => {
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
                type={'number'}
                id={`${questionId}`}
                className={'number-input'}
                placeholder={'Введите число...'}
                value={answer}
                onChange={handleNumberChange}
            />
            {answer && (
                <button onClick={handleClearNumber} className={'clear-button'}>
                    Очистить число
                </button>
            )}
        </div>
    );
}

export default NumberQuestion;
