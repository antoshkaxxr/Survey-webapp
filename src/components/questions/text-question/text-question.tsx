import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-text.css';

type TextQuestionProps = {
    questionInfo: Question;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

function TextQuestion({ questionInfo, onAnswerChange, reset }: TextQuestionProps) {
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
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{questionInfo.question}</h3>
            <textarea
                id={`${questionInfo.questionId}`}
                className={'text-input'}
                rows={5}
                placeholder={'Введите текст...'}
                value={answer}
                onChange={handleTextChange}
            />
            {answer && (
                <button onClick={handleClearText} className={'clear-button'}>
                    Очистить текст
                </button>
            )}
        </div>

    );
}

export default TextQuestion;
