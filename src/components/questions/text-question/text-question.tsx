import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-text.css';

export function TextQuestion({ questionInfo, onAnswerChange, reset }: QuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const answer = event.target.value;
        setAnswer(answer);
        onAnswerChange(questionInfo.questionId, questionInfo.question, answer);
    };

    const handleClearText = () => {
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
            <textarea
                id={`${questionInfo.questionId}`}
                className={'text-input'}
                rows={5}
                placeholder={'Введите текст...'}
                value={answer}
                onChange={handleTextChange}
            />
            {answer && (
                <button onClick={handleClearText} className={'clear-button'}>
                    Очистить текст
                </button>
            )}
        </div>

    );
}
