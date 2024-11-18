import React from "react";
import "./BaseModal.css";

interface BaseModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export function BaseModal({children, onClose}: BaseModalProps) {
    return (
        <div className={'modal-overlay'}>
            <div className={'modal-content'}>
                <button className={'close-button'} onClick={onClose} aria-label={'Закрыть'}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}
