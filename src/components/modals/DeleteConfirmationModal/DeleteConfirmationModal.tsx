import './DeleteConfirmationModal.css';
import {BaseModal} from "../BaseModal/BaseModal.tsx";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
}

export function DeleteConfirmationModal({ isOpen, onConfirm, onCancel, message }: DeleteConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <BaseModal onClose={onCancel}>
            <h3>Вы уверены?</h3>
            <p>{message}</p>
            <div className="delete-modal-buttons">
                <button className="confirm-button" onClick={onConfirm}>Удалить</button>
                <button className="cancel-button" onClick={onCancel}>Отмена</button>
            </div>
        </BaseModal>
    );
}
