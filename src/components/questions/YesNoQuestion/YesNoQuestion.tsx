import {SingleChoiceQuestion} from "../SingleChoiceQuestion/SingleChoiceQuestion.tsx";

export function YesNoQuestion({ questionInfo, onAnswerChange, isRequired,
                                reset, backgroundColor, questionColor, textColor }: QuestionProps) {
    questionInfo.options = ['Да', 'Нет'];
    return (
        <SingleChoiceQuestion
            questionInfo={questionInfo}
            onAnswerChange={onAnswerChange}
            reset={reset}
            isRequired={isRequired}
            backgroundColor={backgroundColor}
            questionColor={questionColor}
            textColor={textColor}
        />
    );
}
