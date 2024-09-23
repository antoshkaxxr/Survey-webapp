import React, { useState } from 'react';
import '../question-style.css';
import './custom-url.css';

type UrlQuestionProps = {
    question: string;
    questionId: number;
};

function UrlQuestion({ question, questionId }: UrlQuestionProps) {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);

        if (!validateUrl(newUrl)) {
            setError('Введите корректный URL');
        } else {
            setError('');
        }
    };

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <input
                type={'url'}
                id={`${questionId}`}
                className={'url-input'}
                value={url}
                onChange={handleChange}
            />
            {error && <span className='error-message'>{error}</span>}
        </div>
    );
}

export default UrlQuestion;
