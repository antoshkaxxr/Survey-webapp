import {useState, ChangeEvent} from 'react';
import './UrlQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function UrlQuestion({ questionInfo, answer, setAnswer,
                              backgroundColor, questionColor, textColor }: QuestionProps) {
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
        setAnswer(newUrl);

        if (!validateUrl(newUrl)) {
            setError('URL введён некорректно');
        } else {
            setError('');
        }
    };

    const handleClearUrl = () => {
        setAnswer('');
        setError('');
    };

    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={answer}
            handleClear={handleClearUrl}
            isRequired={questionInfo.isRequired}
            questionColor={questionColor}
            textColor={textColor}
        >
            <input
                type={'url'}
                id={`${questionInfo.questionId}`}
                className={'url-input'}
                value={answer}
                onChange={handleChange}
                style={{background: backgroundColor}}
            />
            {error && <span className='error-message' style={{color: textColor}}>{error}</span>}
        </BaseQuestion>
    );
}
