import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-number.css';

export function NumberQuestion({ questionInfo, onAnswerChange, reset }: QuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answerValue = event.target.value;
        setAnswer(answerValue);
        onAnswerChange(questionInfo.questionId, questionInfo.question, answerValue);
    };

    const handleClearNumber = () => {
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
                type={'number'}
                id={`${questionInfo.questionId}`}
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
