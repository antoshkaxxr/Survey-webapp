import {sendGetSheetEcxelResponseWhenLogged, sendGetSheetPdfResponseWhenLogged} from "../../../sendResponseWhenLogged.ts";
import "./ExportModal.css";

interface ExportProps {
    surveyId: string;
    surveyName: string;
    onClose: () => void;
}

async function handleExport(surveyId: string, type: string, onClose: () => void) {
    const url = `http://localhost:8080/survey/${surveyId}/generate_${type}`;
    const methods : { [key: string]: (url: string) => Promise<Response> } = {
        'excel': sendGetSheetEcxelResponseWhenLogged,
        'pdf': sendGetSheetPdfResponseWhenLogged
    };

    try {
        const response = await methods[type](url);

        if (!response || !response.ok) {
            throw new Error(`HTTP error! status: ${response && response.status}`);
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
    } catch (error) {
        console.error('Ошибка при экспорте:', error);
    }
    onClose();
}

export function ExportModal({surveyId, surveyName, onClose} : ExportProps) {
    return (
        <div className={'export-modal'}>
            <div className={"modal-overlay"}>
                <div className={"modal-content"}>
                    <div className="export-header">
                        <h3>{surveyName !== '' ? surveyName : 'Без названия'}</h3>
                        <h5>Выберете способ экспортировать статистику</h5>
                        <div className="export-buttons">
                            <button onClick={() => handleExport(surveyId, `excel`, onClose)}>
                                Экспорт в Excel
                            </button>
                            <button onClick={() => handleExport(surveyId, `pdf`, onClose)}>
                                Экспорт в pdf
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
