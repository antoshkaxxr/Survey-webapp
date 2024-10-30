import {useState, ChangeEvent, useEffect} from 'react';
import './NumberQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function NumberQuestion({ questionInfo, onAnswerChange, isRequired, reset }: QuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answerValue = event.target.value;
        setAnswer(answerValue);
        onAnswerChange(questionInfo.questionId, questionInfo.question, answerValue);
    };

    const handleClearNumber = () => {
        setAnswer('');
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    useEffect(() => {
        if (reset) {
            setAnswer('');
        }
    }, [reset]);

    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={answer}
            handleClear={handleClearNumber}
            isRequired={isRequired}
        >
            <input
                type={'number'}
                id={`${questionInfo.questionId}`}
                className={'number-input'}
                placeholder={'Введите число...'}
                value={answer}
                onChange={handleNumberChange}
            />
        </BaseQuestion>
    );
}
