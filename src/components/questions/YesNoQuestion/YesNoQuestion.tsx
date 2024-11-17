import {SingleChoiceQuestion} from "../SingleChoiceQuestion/SingleChoiceQuestion.tsx";

export function YesNoQuestion({ questionInfo, answer, setAnswer,
                                backgroundColor, questionColor, textColor }: QuestionProps) {
    questionInfo.options = ['Да', 'Нет'];
    return (
        <SingleChoiceQuestion
            questionInfo={questionInfo}
            answer={answer}
            setAnswer={setAnswer}
            backgroundColor={backgroundColor}
            questionColor={questionColor}
            textColor={textColor}
        />
    );
}
