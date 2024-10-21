import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-url.css';

type UrlQuestionProps = {
    questionInfo: Question;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
};

function UrlQuestion({ questionInfo, onAnswerChange, reset }: UrlQuestionProps) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const validateUrl = (value: string) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d](?!-)|[a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' +
            'localhost|' +
            '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' +
            '\\[?[a-fA-F0-9:*]+\\])' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$','i');
        return urlPattern.test(value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);

        if (!validateUrl(newUrl)) {
            setError('Введите корректный URL');
        } else {
            setError('');
            onAnswerChange(questionInfo.questionId, questionInfo.question, newUrl);
        }
    };

    const handleClearUrl = () => {
        setUrl('');
        setError('');
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    useEffect(() => {
        if (reset) {
            setUrl('');
            setError('');
        }
    }, [reset]);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{questionInfo.question}</h3>
            <input
                type={'url'}
                id={`${questionInfo.questionId}`}
                className={'url-input'}
                value={url}
                onChange={handleChange}
            />
            {error && <span className='error-message'>{error}</span>}
            {url && (
                <button onClick={handleClearUrl} className={'clear-button'}>
                    Очистить поле
                </button>
            )}
        </div>
    );
}

export default UrlQuestion;
