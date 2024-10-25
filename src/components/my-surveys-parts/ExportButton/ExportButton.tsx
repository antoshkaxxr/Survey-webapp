async function handleExport(surveyId: number) {
    const email = 'jenoshima42@despair.com';
    const url = `http://localhost:8081/user/${email}/survey/${surveyId}/generate`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = 'exported_survey.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
        console.error('Ошибка при экспорте:', error);
    }
}

export function ExportButton({ surveyId }: ButtonProps) {
    return (
        <button onClick={() => handleExport(surveyId)}>
            <img src="/icons/icon-export.svg" alt="Экспорт" />
        </button>
    );
}
