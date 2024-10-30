import React, { useEffect, useRef } from "react";
import './SurveyTitle.css';

interface SurveyTitleProps {
    surveyTitle: string;
    setSurveyTitle: React.Dispatch<React.SetStateAction<string>>;
}

export function SurveyTitle({ surveyTitle, setSurveyTitle }: SurveyTitleProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Функция для автоматического изменения размера textarea
    const autoResize = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Сбрасываем высоту
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем высоту на основе содержимого
        }
    };

    // Вызываем autoResize при изменении surveyTitle
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
                rows={1} // Устанавливаем минимальное количество строк
            />
        </div>
    );
}
