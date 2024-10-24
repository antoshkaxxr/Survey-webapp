export function CopyButton({surveyId}: ButtonProps) {
    const copyToClipboard = (surveyId: number) => {
        navigator.clipboard.writeText(`http://localhost:3000/survey/${surveyId}`).then(() => {
            alert("Ссылка на опрос скопирована в буфер обмена!");
        });
    };

    return (
        <button onClick={() => copyToClipboard(surveyId)}>
            <img src="/icons/icon-copy.svg" alt="Скопировать"/>
        </button>
    );
}
