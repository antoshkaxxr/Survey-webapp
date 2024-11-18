import { useEffect, useRef } from "react";
import './SurveyTitle.css';

interface SurveyTitleProps {
    surveyTitle: string;
    setSurveyTitle: (x: string) => void;
}

export function SurveyTitle({ surveyTitle, setSurveyTitle }: SurveyTitleProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const autoResize = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        autoResize();
    }, [surveyTitle]);

    return (
        <div className="survey-title-container">
            <textarea
                ref={textareaRef}
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="Без названия"
                className="survey-title-textarea"
                rows={1}
            />
        </div>
    );
}
