import {useState, ChangeEvent, useEffect} from 'react';
import './FileQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function FileQuestion({ questionInfo, onAnswerChange, isRequired,
                               reset, questionColor, textColor }: QuestionProps) {
    const [file, setFile] = useState<File>();
    const [error, setError] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                if (file) {
                    setFile(undefined);
                }
                setError('Размер файла не должен превышать 10 МБ.');
            } else {
                setFile(selectedFile);
                setError('');
                onAnswerChange(questionInfo.questionId, questionInfo.question, selectedFile.name);
            }
        }
    }

    const handleClearFile = () => {
        setFile(undefined);
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    useEffect(() => {
        if (reset) {
            setFile(undefined);
        }
    }, [reset]);

    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={file}
            handleClear={handleClearFile}
            isRequired={isRequired}
            questionColor={questionColor}
            textColor={textColor}
        >
            <input
                type="file"
                id={`file-input-${questionInfo.questionId}`}
                onChange={handleFileChange}
                style={{display: 'none'}}
            />
            <label
                htmlFor={`file-input-${questionInfo.questionId}`}
                className="custom-file-label"
            >
                Выбрать файл
            </label>
            {error && <span className={'error-message'}>{error}</span>}
            {file && <span className={'name-message'}>{file.name}</span>}
        </BaseQuestion>
    );
}
