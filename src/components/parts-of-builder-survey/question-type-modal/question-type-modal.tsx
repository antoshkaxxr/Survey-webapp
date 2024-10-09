import '../modal.css';
import './question-type-modal.css';

type QuestionTypeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: string) => void;
}

const questionTypes = [
    { name: "Одиночный выбор", icon: "/icons/single-choice.svg" },
    { name: "Множественный выбор", icon: "/icons/multiple-choice.svg" },
    { name: "Текст", icon: "/icons/text.svg" },
    { name: "Целое число", icon: "/icons/integer.svg" },
    { name: "Да/Нет", icon: "/icons/yes-no.svg" },
    { name: "Дата", icon: "/icons/date.svg" },
    { name: "Ссылка", icon: "/icons/link.svg" },
    { name: "Файл", icon: "/icons/file.svg" },
    { name: "Выпадающий список", icon: "/icons/dropdown.svg" },
    { name: "Шкала", icon: "/icons/scale.svg" }
];

function QuestionTypeModal({ isOpen, onClose, onSelect }: QuestionTypeModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose} aria-label="Закрыть">
                    &times;
                </button>
                <h2 className={'requested-action'}>Выберите тип вопроса:</h2>
                <div className="question-types-container">
                    {questionTypes.map(({ name, icon }) => (
                        <div
                            key={name}
                            className="question-type-item"
                            onClick={() => { onSelect(name); onClose(); }}
                        >
                            <img src={icon} alt={`${name} иконка`} className="question-icon" />
                            {name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuestionTypeModal;
