import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-file.css';

function FileQuestion({ questionInfo, onAnswerChange, reset }: QuestionProps) {
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
        <div className="question-border">
            <h3 className="question-wording">{questionInfo.question}</h3>
            <input
                type="file"
                id={`file-input-${questionInfo.questionId}`}
                onChange={handleFileChange}
                style={{display: 'none'}}
            />
            <label htmlFor={`file-input-${questionInfo.questionId}`} className="custom-file-label">
                Выбрать файл
            </label>
            {error && <span className={'error-message'}>{error}</span>}
            {file && <span className={'name-message'}>{file.name}</span>}
            {file && (
                <button onClick={handleClearFile} className={'clear-button'}>
                    Очистить файл
                </button>
            )}
        </div>
    );
}

export default FileQuestion;
