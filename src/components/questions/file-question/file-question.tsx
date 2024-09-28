import { useState, ChangeEvent } from 'react';
import '../question-style.css';
import './custom-file.css';

type FileQuestionProps = {
    question: string;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
}

function FileQuestion({ question, questionId, onAnswerChange }: FileQuestionProps) {
    const [file, setFile] = useState<File>();
    const [error, setError] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('Размер файла не должен превышать 10 МБ.');
            } else {
                setFile(selectedFile);
                setError('');
                onAnswerChange(questionId, question, selectedFile.name);
            }
        }
    }

    return (
        <div className="question-border">
            <h3 className="question-wording">{question}</h3>
            <input
                type="file"
                id={`file-input-${questionId}`}
                onChange={handleFileChange}
                style={{display: 'none'}}
            />
            <label htmlFor={`file-input-${questionId}`} className="custom-file-label">
                Выбрать файл
            </label>
            {error && <span className={'error-message'}>{error}</span>}
            {file && <span className={'name-message'}>{file.name}</span>}
        </div>
    );
}

export default FileQuestion;
