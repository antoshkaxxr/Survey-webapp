export default function AccessButton({surveyId} : ButtonProps) {
    const handleAccess = (surveyId: number) => {
        alert(`Доступ к опросу с ID ${surveyId}`);
    };

    return (
        <button onClick={() => handleAccess(surveyId)}>
            <img src="/icons/icon-access.svg" alt="Доступ"/>
        </button>
    );
}
