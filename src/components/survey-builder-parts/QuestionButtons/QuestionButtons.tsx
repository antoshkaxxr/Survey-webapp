import './QuestionButtons.css';

interface QuestionButtonsProps {
    index: number;
    setAddIndex: (x: number | null) => void;
    setEditIndex: (x: number | null) => void;
    setSelectedQuestionType: (x: number) => void;
    questions: SurveyQuestion[];
    setInputModalOpen: (x: boolean) => void;
    setTypeModalOpen: (x: boolean) => void;
    setQuestions: (x: SurveyQuestion[]) => void;
}

export function QuestionButtons({index, setAddIndex, setEditIndex, setSelectedQuestionType, questions,
                                    setInputModalOpen, setTypeModalOpen, setQuestions}: QuestionButtonsProps) {
    const handleMoveDown = (index: number) => {
        setAddIndex(index);
        setTypeModalOpen(true);
    };

    const handleEditQuestion = (index: number) => {
        setEditIndex(index);
        setSelectedQuestionType(questions[index].type);
        setInputModalOpen(true);
    };

    const handleDeleteQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    return (
        <div className={'question-buttons'}>
            <button onClick={() => handleMoveDown(index)}>
                <img src="/icons/icon-add-question.svg" alt="Добавить новый вопрос перед этим"/>
            </button>
            <button onClick={() => handleEditQuestion(index)}>
                <img src="/icons/edit.svg" alt="Редактировать"/>
            </button>
            <button onClick={() => handleDeleteQuestion(index)}>
                <img src="/icons/trash-solid.svg" alt="Удалить"/>
            </button>
        </div>
    );
}
