import { useState, ChangeEvent } from 'react';
import './FileQuestion.css';
import { BaseQuestion } from "../BaseQuestion/BaseQuestion.tsx";
import {uploadFileToBucket} from "../../../utils/uploadFile.ts";

export function FileQuestion({ questionInfo, answer, setAnswer, questionColor, textColor }: QuestionProps) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                if (answer) {
                    setAnswer('');
                }
                setError('Размер файла не должен превышать 10 МБ.');
            } else {
                setLoading(true);
                try {
                    const url = await uploadFileToBucket(selectedFile);
                    if (url) {
                        setAnswer(url);
                        setError('');
                    }
                } catch (error) {
                    setError('Произошла ошибка при загрузке файла');
                } finally {
                    setLoading(false);
                }
            }
        }
    }

    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={answer}
            handleClear={() => setAnswer('')}
            isRequired={questionInfo.isRequired}
            questionColor={questionColor}
            textColor={textColor}
            imageUrl={questionInfo.imageUrl}
        >
            <input
                type="file"
                id={`file-input-${questionInfo.questionId}`}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <label
                htmlFor={`file-input-${questionInfo.questionId}`}
                className="custom-file-label"
            >
                Выбрать файл
            </label>
            {loading && <span className={'loading-message'}>Файл загружается...</span>}
            {error && <span className={'error-message'}>{error}</span>}
            {answer !== '' && <span className={'name-message'}>{answer}</span>}
        </BaseQuestion>
    );
}
