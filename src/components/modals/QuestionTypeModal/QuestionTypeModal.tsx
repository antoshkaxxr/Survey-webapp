import './QuestionTypeModal.css';
import {ComponentMap} from "../../../const/ComponentMap.ts";
import {BaseModal} from "../BaseModal/BaseModal.tsx";

interface QuestionTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: number) => void;
}

export function QuestionTypeModal({isOpen, onClose, onSelect}: QuestionTypeModalProps) {
    if (!isOpen) return null;

    return (
        <BaseModal onClose={onClose}>
            <h2 className={'requested-action'}>Выберите тип вопроса:</h2>
            <div className="question-types-container">
                {Object.keys(ComponentMap).map((id) => {
                    const {name, icon} = ComponentMap[+id];
                    return (
                        <div
                            key={id}
                            className="question-type-item"
                            onClick={() => {
                                onSelect(+id);
                                onClose();
                            }}
                        >
                            <img src={icon} alt={`${name} иконка`} className="question-icon"/>
                            {name}
                        </div>
                    );
                })}
            </div>
        </BaseModal>
    );
}
