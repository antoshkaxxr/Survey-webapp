import Question from "../question/question.tsx";

interface EmptyQuestionItemProps {
    theme: string;
}

export default function EmptyQuestionItem({theme} : EmptyQuestionItemProps) {
    return (
        <div key={'question-item-0'} className={'question-item'}>
            <Question
                question={'Добавьте Ваш первый вопрос'}
                type={'на выбор из списка'}
                theme={theme}
            />
        </div>
    );
}
