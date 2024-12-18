import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionTypeModal } from '../../components/modals/QuestionTypeModal/QuestionTypeModal.tsx';
import { QuestionInputModal } from '../../components/modals/QuestionInputModal/QuestionInputModal.tsx';
import { Question } from '../../components/survey-builder-parts/Question/Question.tsx';
import './SurveyBuilderPage.css';
import { AppRoute } from "../../const/AppRoute.ts";
import { SurveyTitle } from "../../components/survey-builder-parts/SurveyTitle/SurveyTitle.tsx";
import { ThemeSelector } from "../../components/survey-builder-parts/ThemeSelector/ThemeSelector.tsx";
import { EmptyQuestionItem } from "../../components/survey-builder-parts/EmptyQuestionItem/EmptyQuestionItem.tsx";
import { QuestionButtons } from "../../components/survey-builder-parts/QuestionButtons/QuestionButtons.tsx";
import { BACK_ADDRESS } from "../../config.ts";
import { AccessModal } from "../../components/modals/AccessModal/AccessModal.tsx";
import { ColorPanel } from '../../components/survey-builder-parts/ColorPanel/ColorPanel.tsx';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import {
    sendGetResponseWhenLogged,
    sendChangingResponseWhenLogged,
} from "../../sendResponseWhenLogged.ts";

export function SurveyBuilderPage() {
    const { id } = useParams<{ id: string }>();
    const [isTypeModalOpen, setTypeModalOpen] = useState<boolean>(false);
    const [isInputModalOpen, setInputModalOpen] = useState<boolean>(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState<number>(0);
    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [addIndex, setAddIndex] = useState<number | null>(null);
    const [surveyTitle, setSurveyTitle] = useState<string>('');
    const [accessSurveyId, setAccessSurveyId] = useState<string | null>(null);
    const [isAccessModalOpen, setAccessModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState<Theme | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>('#D9D9D9');
    const [questionColor, setQuestionColor] = useState<string>('#FFFFFF');
    const [textColor, setTextColor] = useState<string>('#000000');
    const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (id) {
            const fetchSurvey = async () => {
                try {
                    const response = await sendGetResponseWhenLogged(
                        `http://${BACK_ADDRESS}/survey/${id}`);
                    if (!response || !response.ok) {
                        throw new Error('Ошибка при загрузке опроса');
                    }
                    const data = await response.json();
                    setSurveyTitle(data.Name);
                    setQuestions(data.Survey);

                    setBackgroundImage(data.BackgroundImage);
                    setTextColor(data.TextColor)
                    setBackgroundColor(data.BackgroundColor);
                    setQuestionColor(data.QuestionColor);
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            };

            fetchSurvey();
        }
    }, [id]);

    useEffect(() => {
        if (!backgroundImage) {
            setBackgroundUrl(undefined);
            return;
        }

        setBackgroundUrl(backgroundImage.url);
    }, [backgroundImage]);

    const handleSelectQuestionType = (type: number) => {
        setSelectedQuestionType(type);
        setInputModalOpen(true);
        setTypeModalOpen(false);
    };

    const handleSubmitQuestion = (newQuestion: SurveyQuestion) => {
        if (addIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions.splice(addIndex + 1, 0, newQuestion);
            setQuestions(updatedQuestions);
            setAddIndex(null);
        } else if (editIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[editIndex] = newQuestion;
            setQuestions(updatedQuestions);
            setEditIndex(null);
        } else {
            setQuestions([...questions, newQuestion]);
        }

        setInputModalOpen(false);
        setSelectedQuestionType(0);
    };

    const handleSubmit = async () => {
        const data = {
            Name: surveyTitle,
            BackgroundImage: backgroundImage,
            BackgroundColor: backgroundColor,
            QuestionColor: questionColor,
            TextColor: textColor,
            Survey: questions
        };

        console.log(data);

        try {
            let response;
            if (id) {
                response = await sendChangingResponseWhenLogged(
                    'PATCH',
                    `http://${BACK_ADDRESS}/survey/${id}`,
                    data
                );
                setAccessSurveyId(id);
            } else {
                response = await sendChangingResponseWhenLogged(
                    'POST',
                    `http://${BACK_ADDRESS}/survey`,
                    data
                );
                const retrievedId = await response.text();
                setAccessSurveyId(retrievedId);
            }

            if (!response || !response.ok) {
                throw new Error('Network response was not ok');
            }

            setAccessModalOpen(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const reorderedQuestions = Array.from(questions);
        const [movedItem] = reorderedQuestions.splice(result.source.index, 1);
        reorderedQuestions.splice(result.destination.index, 0, movedItem);

        setQuestions(reorderedQuestions);
    };

    return (
        <div>
            <div className={'builder-container'}>
                <div className={'theme-color'}>
                    <ThemeSelector backgroundImage={backgroundImage} setBackgroundImage={setBackgroundImage} />
                    <ColorPanel selectedColor={backgroundColor} setSelectedColor={setBackgroundColor} name='Задний фон' />
                    <ColorPanel selectedColor={questionColor} setSelectedColor={setQuestionColor} name='Цвет вопроса' />
                    <ColorPanel selectedColor={textColor} setSelectedColor={setTextColor} name='Цвет текста' />
                </div>
                <div className={'survey-window'}  style={{ backgroundColor: backgroundColor, backgroundSize: 'cover' }}>
                <div className='cover' style={{ backgroundImage: backgroundImage ? `url(${backgroundUrl})` : undefined, backgroundSize: 'cover', height: backgroundImage ? 200 : 0 }}></div>
                    <div className="questions-list">
                        <SurveyTitle surveyTitle={surveyTitle} setSurveyTitle={setSurveyTitle} />
                        {questions.length === 0 &&
                            <EmptyQuestionItem />
                        }
                        {questions.length > 0 &&
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div className="dropzone" {...provided.droppableProps} ref={provided.innerRef}>
                                            {questions.map((question, i) => (
                                                <Draggable key={question.questionId.toString()} draggableId={question.questionId.toString()} index={i}>
                                                    {(provided) => (
                                                        <div className="move-box"
                                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <div key={i} className="question-item">
                                                                <div className='question-container'
                                                                    style={{ backgroundColor: questionColor }}>
                                                                    <Question
                                                                        question={question.question}
                                                                        type={question.type}
                                                                        textColor={textColor}
                                                                        initialOptions={questions[i].options}
                                                                        imageUrl={question.imageUrl}
                                                                    />
                                                                </div>
                                                                <QuestionButtons
                                                                    index={i}
                                                                    setAddIndex={setAddIndex}
                                                                    setEditIndex={setEditIndex}
                                                                    setSelectedQuestionType={setSelectedQuestionType}
                                                                    questions={questions}
                                                                    setInputModalOpen={setInputModalOpen}
                                                                    setTypeModalOpen={setTypeModalOpen}
                                                                    setQuestions={setQuestions}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        }
                        <button className={'add-question-button'} onClick={() => setTypeModalOpen(true)}>Добавить вопрос</button>
                        <button className={'save-survey-button'} onClick={handleSubmit}>Сохранить опрос</button>
                    </div>
                    <QuestionTypeModal
                        isOpen={isTypeModalOpen}
                        onClose={() => setTypeModalOpen(false)}
                        onSelect={handleSelectQuestionType}
                    />
                    <QuestionInputModal
                        isOpen={isInputModalOpen}
                        onClose={() => {
                            setInputModalOpen(false);
                            setEditIndex(null);
                        }}
                        questionType={selectedQuestionType}
                        onSubmit={handleSubmitQuestion}
                        initialQuestion={editIndex !== null ? questions[editIndex].question : ""}
                        initialOptions={editIndex !== null && questions[editIndex].options ? questions[editIndex].options : []}
                    />
                    <AccessModal
                        isOpen={isAccessModalOpen}
                        onClose={() => {
                            setAccessModalOpen(false);
                            navigate(AppRoute.MySurveys);
                        }}
                        accessSurveyId={accessSurveyId}
                    />
                </div>
            </div>
        </div>
    );
}
