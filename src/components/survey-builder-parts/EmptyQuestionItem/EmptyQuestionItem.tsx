interface EmptyQuestionItemProps {
    theme: string;
}

export function EmptyQuestionItem({theme} : EmptyQuestionItemProps) {
    return (
        <div key={'question-item-0'} className={'question-item'}>
            <div className={`question-container-${theme}`}>
                <h2 className={`question-h3-${theme}`}>Добавьте первый вопрос</h2>
                <h3 className={`question-type-p-${theme}`}>Тип вопроса: на выбор из списка</h3>
            </div>
        </div>
    );
}
