import {useState, ChangeEvent, useEffect} from 'react';
import './TextQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function TextQuestion({ questionInfo, onAnswerChange, isRequired, reset }: QuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const answer = event.target.value;
        setAnswer(answer);
        onAnswerChange(questionInfo.questionId, questionInfo.question, answer);
    };

    const handleClearText = () => {
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
            handleClear={handleClearText}
            isRequired={isRequired}
        >
            <textarea
                id={`${questionInfo.questionId}`}
                className={'text-input'}
                rows={5}
                placeholder={'Введите текст...'}
                value={answer}
                onChange={handleTextChange}
            />
        </BaseQuestion>
    );
}
