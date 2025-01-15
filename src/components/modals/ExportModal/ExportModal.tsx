import "./ExportModal.css";
import { BaseModal } from "../BaseModal/BaseModal.tsx";
import { BACK_ADDRESS } from "../../../config.ts";
import { useState } from "react";
import { getCookie } from "../../../sendResponseWhenLogged.ts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ExportProps {
    surveyId: string;
    surveyName: string;
    onClose: () => void;
}

async function handleExport(surveyId: string, type: string, onClose: () => void, setReportId: (id: string) => void) {
    const url = `https://${BACK_ADDRESS}/survey/${surveyId}/generate_${type}`;
    try {
        toast.info('Началась загрузка отчета. Скоро начнется скачивание.', {
            position: 'bottom-right',
        });

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('Token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reportId = await response.text();
        setReportId(reportId);
    } catch (error) {
        toast.error('Ошибка при запросе генерации отчета.', {
            position: 'bottom-right',
        });
        onClose();
    }
}

async function checkReportStatus(surveyId: string, reportId: string, type: string, onClose: () => void) {
    const url = `https://${BACK_ADDRESS}/survey/${surveyId}/report/${reportId.split('_')[0]}/try_get`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('Token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            const reportStatus = data.status;

            if (reportStatus !== 'READY') {
                setTimeout(() => checkReportStatus(surveyId, reportId, type, onClose), 2000);
                return;
            }
        }

        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = `exported_survey.${type === "excel" ? "xlsx" : type}`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(urlBlob);
        toast.success('Отчет успешно скачан.', {
            position: 'bottom-right',
        });
        onClose();
    } catch (error) {
        toast.error('Ошибка при получении отчета.', {
            position: 'bottom-right',
        });
        onClose();
    }
}

export function ExportModal({ surveyId, surveyName, onClose }: ExportProps) {
    const [reportId, setReportId] = useState<string | null>(null);

    const handleExportClick = (type: string) => {
        handleExport(surveyId, type, onClose, setReportId);
    };

    if (reportId) {
        checkReportStatus(surveyId, reportId, reportId.includes('excel') ? 'excel' : 'pdf', onClose);
    }

    return (
        <BaseModal onClose={onClose}>
            <h3>{surveyName !== '' ? surveyName : 'Без названия'}</h3>
            <h5>Выберите формат файла, в который Вы хотите экспортировать результаты опроса:</h5>
            <div className="export-buttons">
                <button onClick={() => handleExportClick('excel')}>
                    Excel
                </button>
                <button onClick={() => handleExportClick('pdf')}>
                    PDF
                </button>
            </div>
            <ToastContainer />
        </BaseModal>
    );
}
