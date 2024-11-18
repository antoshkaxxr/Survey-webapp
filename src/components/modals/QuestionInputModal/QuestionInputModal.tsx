import { useEffect, useState } from 'react';
import './QuestionInputModal.css';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {BaseModal} from "../BaseModal/BaseModal.tsx";

type QuestionInputModalProps = {
    isOpen: boolean;
    onClose: () => void;
    questionType: number;
    onSubmit: (newQuestion: SurveyQuestion) => void;
    initialQuestion?: string;
    initialOptions?: string[];
}

const optionQuestionTypes = [1, 2, 9];

const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substring(2, 9);
};

export function QuestionInputModal({ isOpen, onClose, questionType, onSubmit,
                                       initialQuestion = '', initialOptions = [] }: QuestionInputModalProps) {
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [ranges, setRanges] = useState<string[]>(['', '']);
    const [isRequired, setIsRequired] = useState(false);
    const [isQuestionValid, setIsQuestionValid] = useState(true);
    const [areOptionsValid, setAreOptionsValid] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setQuestion(initialQuestion);
            setOptions(initialOptions.length > 0 ? initialOptions :
                Array(1).fill('').map((_, index) => `Вариант ${index + 1}`));
        }
    }, [isOpen, initialQuestion, initialOptions]);

    useEffect(() => {
        setIsQuestionValid(question.trim() !== '');
    }, [question]);

    useEffect(() => {
        setAreOptionsValid(options.every(option => option.trim() !== ''));
    }, [options]);

    if (!isOpen) return null;

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);

        if (!newOptions.some((opt, i) => opt.trim().toLowerCase() === value.trim().toLowerCase() && i !== index)) {
            setOptions(newOptions);
        }
    };

    const handleAddOption = () => {
        setOptions([...options, `Вариант ${options.length + 1}`]);
    };

    const handleRemoveOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (isQuestionValid && (optionQuestionTypes.includes(questionType) ? areOptionsValid : true)) {
            const newQuestion: SurveyQuestion = {
                question,
                type: questionType,
                options: optionQuestionTypes.includes(questionType) ? options : undefined,
                questionId: generateUniqueId(),
                isRequired,
                ranges: questionType === 10 ? ranges : undefined
            };
            onSubmit(newQuestion);
            setIsRequired(false);
            onClose();
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const reorderedBoxes = Array.from(options);
        const [removed] = reorderedBoxes.splice(result.source.index, 1);
        reorderedBoxes.splice(result.destination.index, 0, removed);
        setOptions(reorderedBoxes);
    };

    const hasDuplicate = (value: string) => {
        const filteredOptions = options.filter(opt => opt.trim().toLowerCase() === value.trim().toLowerCase());
        return filteredOptions.length > 1;
    };

    const hasDuplicates = (array: string[]) => {
        return array.length !== new Set(array.map(item => item.trim().toLowerCase())).size;
    };

    const handleRangeChange = (index: number, value: string) => {
        const newRanges = [...ranges];
        newRanges[index] = value;
        setRanges(newRanges);
    };

    return (
        <BaseModal onClose={onClose}>
            <h2 className={'requested-action'}>
                {initialQuestion ? 'Отредактируйте вопрос:' : 'Введите вопрос:'}
            </h2>
            <input
                type="text"
                className={`question-input ${question.trim() !== '' ? '' : 'invalid'}`}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Вопрос"
            />
            <label className={"radio-label"}>
                <input
                    type="checkbox"
                    id={`${question}-necessarily`}
                    value={"Обязательный вопрос"}
                    checked={isRequired}
                    onChange={() => setIsRequired(!isRequired)}
                />
                <span>Обязательный вопрос</span>
            </label>
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
                                                            className={`option-input ${option.trim() !== '' ? '' : 'invalid'} ${hasDuplicate(option) ? 'invalid' : ''}`}
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
            {questionType === 10 && (
                <>
                    <p>Минимум</p>
                    <input
                        type="number"
                        className={'question-input'}
                        value={ranges[0]}
                        onChange={(e) => handleRangeChange(0, e.target.value)}
                        placeholder="1"
                    />
                    <p>Максимум</p>
                    <input
                        type="number"
                        className={'question-input'}
                        value={ranges[1]}
                        onChange={(e) => handleRangeChange(1, e.target.value)}
                        placeholder="10"
                    />
                </>
            )}
            <button
                className={`save-button ${isQuestionValid &&
                (optionQuestionTypes.includes(questionType) ? areOptionsValid : true) &&
                !hasDuplicates(options) &&
                (questionType === 10 ? ranges[0] !== '' && ranges[1] !== '' : true) ? '' : 'disabled'}`}
                onClick={handleSubmit}
                disabled={!isQuestionValid ||
                    (optionQuestionTypes.includes(questionType) ? !areOptionsValid || hasDuplicates(options) : false) ||
                    (questionType === 10 ? ranges[0] === '' || ranges[1] === '' : false)}
            >
                {initialQuestion ? 'Сохранить изменения' : 'Сохранить'}
            </button>
        </BaseModal>
    );
}
