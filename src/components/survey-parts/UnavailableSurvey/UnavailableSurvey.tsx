import './UnavailableSurvey.css';


interface Message {
    message: string;
}
export function UnavailableSurvey({message}: Message) {
    return (
        <>
            <div className="unavailable-survey">
                <h1>Опрос закрыт</h1>
                <p>К сожалению, этот опрос больше недоступен к прохождению.</p>
                <p>{message}</p>
            </div>
            <div className={'unavailable-survey-img'}>
            <img
                    src={'/images/unavailable-survey.png'}
                    alt={'Опрос недоступен'}
                />
            </div>
        </>
    );
}
