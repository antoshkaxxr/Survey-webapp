import {useState, ChangeEvent, useEffect} from 'react';
import '../BaseQuestion/BaseQuestion.css';
import './DateQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function DateQuestion({ questionInfo, onAnswerChange, isRequired,
                               reset, backgroundColor, questionColor, textColor }: QuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setAnswer(answer);
        onAnswerChange(questionInfo.questionId, questionInfo.question, answer);
    };

    const handleClearDate = () => {
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
            handleClear={handleClearDate}
            isRequired={isRequired}
            questionColor={questionColor}
            textColor={textColor}
        >
            <input
                type={'date'}
                id={`${questionInfo.questionId}`}
                className={'date-input'}
                value={answer}
                onChange={handleDateChange}
                style={{background: backgroundColor}}
            />
        </BaseQuestion>
    );
}
