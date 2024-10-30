import './UnavailableSurvey.css';

export function UnavailableSurvey() {
    return (
        <>
            <div className="unavailable-survey">
                <h1>Опрос закрыт</h1>
                <p>К сожалению, этот опрос больше недоступен к прохождению.</p>
                <p>По всем вопросам обращайтесь к создателю опроса.</p>
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
