import { useState, useEffect } from 'react';
import '../BaseModal/BaseModal.css';
import './AccessModal.css';
import { BACK_ADDRESS } from "../../../config.ts";
import { sendChangingResponseWhenLogged, sendGetResponseWhenLogged } from "../../../sendResponseWhenLogged.ts";
import { BaseModal } from "../BaseModal/BaseModal.tsx";

interface AccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    accessSurveyId: string | null;
}

interface AccessData {
    isAvailable: boolean;
    isLimited: boolean;
    startTime: string;
    endTime: string;
}

export function AccessModal({ isOpen, onClose, accessSurveyId }: AccessModalProps) {
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [timeLimited, setTimeLimited] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        if (isOpen && accessSurveyId) {
            fetchAccessData();
        }
    }, [isOpen, accessSurveyId]);

    const fetchAccessData = async () => {
        try {
            const response = await sendGetResponseWhenLogged(`http://${BACK_ADDRESS}/survey/${accessSurveyId}/access`);
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }

            const data = await response.json();
            restoreAccessData(data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    const restoreAccessData = (data: AccessData) => {
        if (data.isAvailable) {
            setSelectedType(1);
            setTimeLimited(data.isLimited);
            if (data.isLimited) {
                if (data.startTime !== "") {
                    setStartDate(new Date(data.startTime));
                }
                if (data.endTime !== "") {
                    setEndDate(new Date(data.endTime));
                }
            }
        } else {
            setSelectedType(0);
        }
    };

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
            const response = await sendChangingResponseWhenLogged('POST', `http://${BACK_ADDRESS}/survey/${accessSurveyId}/access`, requestBody);

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
        setTimeLimited(false);
        setStartDate(null);
        setEndDate(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <BaseModal onClose={handleClose}>
            <h2 className={'requested-action'}>Настройте доступ к опросу</h2>
            <div className={'access-types-container'}>
                <div className={'access-type'}>
                    <label>
                        <input
                            type={'radio'}
                            name={'accessType'}
                            value={1}
                            checked={selectedType === 1}
                            onChange={handleActiveChange}
                        />
                        Активный
                    </label>
                    {selectedType === 1 && (
                        <>
                            <label>
                                <input
                                    type={'checkbox'}
                                    checked={timeLimited}
                                    onChange={handleTimeLimitChange}
                                />
                                Добавить ограничение по времени
                            </label>
                            {timeLimited && (
                                <div className={'date-range-container'}>
                                    <label>
                                        Начало:
                                        <input
                                            type={'datetime-local'}
                                            value={startDate ? startDate.toISOString().slice(0, 16) : ''}
                                            onChange={(e) => setStartDate(new Date(e.target.value))}
                                        />
                                    </label>
                                    <label>
                                        Конец:
                                        <input
                                            type={'datetime-local'}
                                            value={endDate ? endDate.toISOString().slice(0, 16) : ''}
                                            onChange={(e) => setEndDate(new Date(e.target.value))}
                                        />
                                    </label>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className={'access-type'}>
                    <label>
                        <input
                            type={'radio'}
                            name={'accessType'}
                            value={0}
                            checked={selectedType === 0}
                            onChange={() => setSelectedType(0)}
                        />
                        Неактивный
                    </label>
                </div>
            </div>
            <button className={'select-button'} onClick={handleSelect}>
                Выбрать
            </button>
        </BaseModal>
    );
}
