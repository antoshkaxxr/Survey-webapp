import { useEffect, useState } from 'react';
import '../modal.css';
import './question-input-modal.css';

type QuestionInputModalProps = {
    isOpen: boolean;
    onClose: () => void;
    questionType: string | null;
    onSubmit: (question: string, options?: string[]) => void;
    initialQuestion?: string;
    initialOptions?: string[];
}

export function QuestionInputModal({ isOpen, onClose, questionType, onSubmit,
                                initialQuestion = '', initialOptions = [] }: QuestionInputModalProps) {

    const [question, setQuestion] = useState<string>(initialQuestion);
    const [options, setOptions] = useState<string[]>(initialOptions.length > 0 ? initialOptions : ['']);

    useEffect(() => {
        if (isOpen) {
            setQuestion(initialQuestion);
            setOptions(initialOptions.length > 0 ? initialOptions : ['']);
        }
    }, [isOpen, initialQuestion, initialOptions]);

    if (!isOpen) return null;

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        onSubmit(question, questionType?.includes('выбор') || questionType?.includes('список') ? options : undefined);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose} aria-label="Закрыть">
                    &times;
                </button>
                <h2 className={'requested-action'}>
                    {initialQuestion ? 'Отредактируйте вопрос:' : 'Введите вопрос:'}
                </h2>
                <input
                    type="text"
                    className={'question-input'}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Вопрос"
                />
                {(questionType?.includes('выбор') || questionType?.includes('список')) && (
                    <>
                        <h2 className={'requested-action'}>
                            {initialOptions.length > 0 ? 'Отредактируйте варианты ответов:' : 'Введите варианты ответов:'}
                        </h2>
                        {options.map((option, index) => (
                            <div key={index} className="option-input">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder={`Вариант ${index + 1}`}
                                />
                                {options.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveOption(index)}>
                                        Удалить
                                    </button>
                                )}
                            </div>
                        ))}
                        <div>
                            <button className={'add-button'} type="button" onClick={handleAddOption}>
                                Добавить вариант
                            </button>
                        </div>
                    </>
                )}
                <button className={'save-button'} onClick={handleSubmit}>
                    {initialQuestion ? 'Сохранить изменения' : 'Сохранить'}
                </button>
            </div>
        </div>
    );
}
