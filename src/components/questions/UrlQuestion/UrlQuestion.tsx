import {useState, ChangeEvent, useEffect} from 'react';
import './UrlQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function UrlQuestion({ questionInfo, onAnswerChange, isRequired,
                              reset, backgroundColor, questionColor, textColor }: QuestionProps) {
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
        <BaseQuestion
            question={questionInfo.question}
            answer={url}
            handleClear={handleClearUrl}
            isRequired={isRequired}
            questionColor={questionColor}
            textColor={textColor}
        >
            <input
                type={'url'}
                id={`${questionInfo.questionId}`}
                className={'url-input'}
                value={url}
                onChange={handleChange}
                style={{background: backgroundColor}}
            />
            {error && <span className='error-message'>{error}</span>}
        </BaseQuestion>
    );
}
