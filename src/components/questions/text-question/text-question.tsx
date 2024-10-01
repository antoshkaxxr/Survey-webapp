import {useState, ChangeEvent, useEffect} from 'react';
import '../question-style.css';
import './custom-text.css';

type TextQuestionProps = {
    question: string;
    questionId: number;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

function TextQuestion({ question, questionId, onAnswerChange, reset }: TextQuestionProps) {
    const [answer, setAnswer] = useState<string>('');

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const answer = event.target.value;
        setAnswer(answer);
        onAnswerChange(questionId, question, answer);
    };

    const handleClearText = () => {
        setAnswer('');
        onAnswerChange(questionId, question, '');
    };

    useEffect(() => {
        if (reset) {
            setAnswer('');
        }
    }, [reset]);

    return (
        <div className={'question-border'}>
            <h3 className={'question-wording'}>{question}</h3>
            <textarea
                id={`${questionId}`}
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
