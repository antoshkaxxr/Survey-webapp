import '../Modal.css';
import './QuestionTypeModal.css';
import {ComponentMap} from "../../../const/ComponentMap.ts";

interface QuestionTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: number) => void;
}

export function QuestionTypeModal({ isOpen, onClose, onSelect }: QuestionTypeModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose} aria-label="Закрыть">
                    &times;
                </button>
                <h2 className={'requested-action'}>Выберите тип вопроса:</h2>
                <div className="question-types-container">
                    {Object.keys(ComponentMap).map((id) => {
                        const { name, icon } = ComponentMap[+id];
                        return (
                            <div
                                key={id}
                                className="question-type-item"
                                onClick={() => { onSelect(+id); onClose(); }}
                            >
                                <img src={icon} alt={`${name} иконка`} className="question-icon" />
                                {name}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
