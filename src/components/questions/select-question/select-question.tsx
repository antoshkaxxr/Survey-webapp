import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-select.css';

function SelectQuestion({ questionInfo, onAnswerChange, reset }: QuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const option = event.target.value;
        setSelectedOption(option);
        onAnswerChange(questionInfo.questionId, questionInfo.question, option);
    };

    useEffect(() => {
        if (reset) {
            setSelectedOption(null);
        }
    }, [reset]);

    const handleClearSelection = () => {
        setSelectedOption(null);
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{questionInfo.question}</h3>
            <select
                className={'option-select'}
                value={selectedOption || ''}
                onChange={handleOptionChange}
            >
                <option value="" disabled>Выберите ответ</option>
                {questionInfo.options && questionInfo.options.map((option, index) => (
                    <option id={`${questionInfo.questionId}-option-${index}`} key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {selectedOption && (
                <button onClick={handleClearSelection} className={'clear-button'}>
                    Очистить выбор
                </button>
            )}
        </div>
    );
}

export default SelectQuestion;
