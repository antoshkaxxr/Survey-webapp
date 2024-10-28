import { useEffect, useState } from 'react';
import '../Modal.css';
import './QuestionInputModal.css';
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from 'react-beautiful-dnd';
type QuestionInputModalProps = {
    isOpen: boolean;
    onClose: () => void;
    questionType: number;
    onSubmit: (question: string, options?: string[]) => void;
    initialQuestion?: string;
    initialOptions?: string[];
}

const optionQuestionTypes = [1, 2, 9];

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
        onSubmit(question, optionQuestionTypes.includes(questionType) ? options : undefined);
        onClose();
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedBoxes = Array.from(options);
        const [removed] = reorderedBoxes.splice(result.source.index, 1);
        reorderedBoxes.splice(result.destination.index, 0, removed);
        setOptions(reorderedBoxes);
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
                {optionQuestionTypes.includes(questionType) && (
                    <>
                        <h2 className={'requested-action'}>
                            {initialOptions.length > 0 ? 'Отредактируйте варианты ответов:' : 'Введите варианты ответов:'}
                        </h2>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div className="dropzone" {...provided.droppableProps} ref={provided.innerRef}>
                                        {options.map((option, index) => (
                                            <Draggable key={`${index}`} draggableId={`${index}`} index={index}>
                                                {(provided) => (
                                                    <div className="move-box"
                                                         ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <div key={index} className="option-input">
                                                            <input
                                                                type="text"
                                                                value={option}
                                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                                placeholder={`Вариант ${index + 1}`}
                                                            />
                                                            {options.length > 1 && (
                                                                <button type="button"
                                                                        onClick={() => handleRemoveOption(index)}>
                                                                    Удалить
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
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
