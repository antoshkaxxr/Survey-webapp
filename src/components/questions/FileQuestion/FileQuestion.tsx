import {useState, ChangeEvent} from 'react';
import './FileQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function FileQuestion({ questionInfo, answer, setAnswer,
                               questionColor, textColor }: QuestionProps) {
    const [error, setError] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                if (answer) {
                    setAnswer('');
                }
                setError('Размер файла не должен превышать 10 МБ.');
            } else {
                // Логика по загрузке файла в бакет!!!
                setError('');
                setAnswer(selectedFile.name);
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
            {answer !== '' && <span className={'name-message'}>{answer}</span>}
        </BaseQuestion>
    );
}
