import {BaseModal} from "../BaseModal/BaseModal.tsx";
import './LogoutModal.css';

type LogoutModalProps = {
    onCancel: () => void;
    onConfirm: () => void;
}

export function LogoutModal({onCancel, onConfirm}: LogoutModalProps) {
    return (
        <BaseModal onClose={onCancel}>
            <div className="logout-modal-content">
                <h2>Вы уверены, что хотите выйти?</h2>
                <div className="logout-modal-buttons">
                    <button className="logout-confirm-btn" onClick={onConfirm}>
                        Да, выйти
                    </button>
                    <button className="logout-cancel-btn" onClick={onCancel}>
                        Отмена
                    </button>
                </div>
            </div>
        </BaseModal>
    );
}
