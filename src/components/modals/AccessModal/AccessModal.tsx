import { useState } from 'react';
import '../../survey-builder-parts/Modal.css';
import './AccessModal.css';
import {IP_ADDRESS} from "../../../config.ts";

interface AccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    accessSurveyId: string | null;
}

export function AccessModal({ isOpen, onClose, accessSurveyId }: AccessModalProps) {
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [timeLimited, setTimeLimited] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    if (!isOpen) return null;

    const handleSelect = async () => {
        if (selectedType === null) {
            handleClose();
            return;
        }

        if (accessSurveyId === null) return;

        const status = selectedType === 1 ? "Active" : "Inactive";
        const isLimited = selectedType === 1 && timeLimited;
        const timeIntervals = isLimited ? [startDate ? startDate.toISOString() : new Date().toISOString(), endDate ? endDate.toISOString() : new Date().toISOString()] : [];

        const requestBody = {
            status: status,
            isLimited: isLimited,
            timeIntervals: timeIntervals
        };

        try {
            const response = await fetch(`http://${IP_ADDRESS}:8080/survey/${accessSurveyId}/access`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке данных');
            }

            console.log('Данные успешно отправлены');
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        } finally {
            handleClose();
        }
    };

    const handleActiveChange = () => {
        setSelectedType(1);
        setTimeLimited(false);
        setStartDate(null);
        setEndDate(null);
    };

    const handleTimeLimitChange = () => {
        setTimeLimited(prev => !prev);
    };

    const handleClose = () => {
        setSelectedType(null);
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={handleClose} aria-label="Закрыть">
                    &times;
                </button>
                <h2 className={'requested-action'}>Настройте доступ к опросу</h2>
                <div className="access-types-container">
                    <div className="access-type">
                        <label>
                            <input
                                type="radio"
                                name="accessType"
                                value={1}
                                onChange={handleActiveChange}
                            />
                            Активный
                        </label>
                        {selectedType === 1 && (
                            <>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={timeLimited}
                                        onChange={handleTimeLimitChange}
                                    />
                                    Добавить ограничение по времени
                                </label>
                                {timeLimited && (
                                    <div className="date-range-container">
                                        <label>
                                            Начало:
                                            <input
                                                type="datetime-local"
                                                onChange={(e) => setStartDate(new Date(e.target.value))}
                                            />
                                        </label>
                                        <label>
                                            Конец:
                                            <input
                                                type="datetime-local"
                                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                            />
                                        </label>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="access-type">
                        <label>
                            <input
                                type="radio"
                                name="accessType"
                                value={0}
                                onChange={() => setSelectedType(0)}
                            />
                            Неактивный
                        </label>
                    </div>
                </div>
                <button className="select-button" onClick={handleSelect}>
                    Выбрать
                </button>
            </div>
        </div>
    );
}
