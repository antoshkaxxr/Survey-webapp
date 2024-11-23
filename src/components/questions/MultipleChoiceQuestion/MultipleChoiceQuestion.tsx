import './MultipleChoiceQuestion.css';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";

export function MultipleChoiceQuestion({ questionInfo, answer, setAnswer,
                                         questionColor, textColor }: QuestionProps) {
    const handleOptionChange = (option: string) => {
        const currentOptions: string[] = answer !== ''
            ? answer.split('\n')
            : [];

        const updatedOptions = currentOptions.includes(option)
            ? currentOptions.filter(opt => opt !== option)
            : [...currentOptions, option];

        setAnswer(updatedOptions.join('\n'));
    };

    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={answer}
            handleClear={() => setAnswer('')}
            isRequired={questionInfo.isRequired}
            questionColor={questionColor}
            textColor={textColor}
        >
             {questionInfo.options && questionInfo.options.map((option, index) => (
                <label key={index} className={'checkbox-label'}>
                    <input
                        type="checkbox"
                        className={'custom-checkbox'}
                        id={`${questionInfo.questionId}-option-${index}`}
                        value={option}
                        checked={answer.includes(option)}
                        onChange={() => handleOptionChange(option)}
                    />
                    <span
                        className={'checkbox-value'}
                        style={{color: textColor}}
                    >
                        {option ||`Вариант ${index + 1}`}
                    </span>
                </label>
            ))}

        </BaseQuestion>
    );
}
