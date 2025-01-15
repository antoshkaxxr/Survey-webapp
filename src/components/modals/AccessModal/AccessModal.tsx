import { useState, useEffect } from 'react';
import '../BaseModal/BaseModal.css';
import './AccessModal.css';
import { BACK_ADDRESS } from "../../../config.ts";
import { sendChangingResponseWhenLogged, sendGetResponseWhenLogged } from "../../../sendResponseWhenLogged.ts";
import { BaseModal } from "../BaseModal/BaseModal.tsx";
import {toast, ToastContainer} from "react-toastify";

interface AccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    accessSurveyId: string | null;
}

interface AccessData {
    isAvailable: boolean;
    isLimited: boolean;
    startTime: string;
    endTime: string;
}

export function AccessModal({ isOpen, onClose, onConfirm, accessSurveyId }: AccessModalProps) {
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [timeLimited, setTimeLimited] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && accessSurveyId) {
            fetchAccessData();
        }
    }, [isOpen, accessSurveyId]);

    const fetchAccessData = async () => {
        try {
            const response = await sendGetResponseWhenLogged(`https://${BACK_ADDRESS}/survey/${accessSurveyId}/access`);
            if (!response.ok) {
                toast.error('Ошибка при получении данных');
            }

            const data = await response.json();
            restoreAccessData(data);
        } catch (error) {
            toast.error('Ошибка при получении данных');
        }
    };

    const restoreAccessData = (data: AccessData) => {
        if (data.isAvailable) {
            setSelectedType(1);
            setTimeLimited(data.isLimited);
            if (data.isLimited) {
                if (data.startTime !== "") {
                    setStartDate(data.startTime);
                }
                if (data.endTime !== "") {
                    setEndDate(data.endTime);
                }
            }
        } else {
            setSelectedType(0);
        }
    };

    const handleSelect = async () => {
        if (accessSurveyId === null) return;

        const status = selectedType === 1 ? "Active" : "Inactive";
        const isLimited = selectedType === 1 && timeLimited;
        const timeIntervals = isLimited ? [startDate || getLocalDateTimeString(new Date()), endDate || getLocalDateTimeString(new Date())] : [];

        const requestBody = {
            status: status,
            isLimited: isLimited,
            timeIntervals: timeIntervals
        };

        try {
            const response = await sendChangingResponseWhenLogged('POST', `https://${BACK_ADDRESS}/survey/${accessSurveyId}/access`, requestBody);

            if (!response.ok) {
                toast.error('Ошибка при отправке данных');
            }
        } catch (error) {
            toast.error('Ошибка при отправке данных');
        } finally {
            onConfirm();
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

    const getLocalDateTimeString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleStartDateChange = (value: string) => {
        const selectedDate = new Date(value);
        const now = new Date();

        if (selectedDate >= now) {
            setStartDate(value);

            if (endDate && new Date(endDate) < selectedDate) {
                setEndDate(value);
            }
        } else {
            toast.error('Дата и время не могут быть раньше текущего времени');
            setStartDate(getLocalDateTimeString(now));
        }
    };

    const handleEndDateChange = (value: string) => {
        const selectedDate = new Date(value);

        if (startDate && selectedDate < new Date(startDate)) {
            toast.error('Дата окончания не может быть раньше даты начала');
            setEndDate(startDate);
        } else {
            setEndDate(value);
        }
    };

    if (!isOpen) return null;

    return (
        <>
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
                                                value={startDate || ''}
                                                onChange={(e) => handleStartDateChange(e.target.value)}
                                                min={getLocalDateTimeString(new Date())}
                                                onKeyDown={e => e.preventDefault()}
                                            />
                                        </label>
                                        <label>
                                            Конец:
                                            <input
                                                type={'datetime-local'}
                                                value={endDate || ''}
                                                onChange={(e) => handleEndDateChange(e.target.value)}
                                                min={startDate || getLocalDateTimeString(new Date())}
                                                onKeyDown={e => e.preventDefault()}
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
                <button
                    className={'select-button'}
                    onClick={handleSelect}
                    disabled={selectedType === null}
                >
                    Выбрать
                </button>
            </BaseModal>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
                draggable
            />
        </>
    );
}
