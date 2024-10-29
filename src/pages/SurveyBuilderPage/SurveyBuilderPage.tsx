import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { QuestionTypeModal } from '../../components/survey-builder-parts/QuestionTypeModal/QuestionTypeModal.tsx';
import { QuestionInputModal } from '../../components/survey-builder-parts/QuestionInputModal/QuestionInputModal.tsx';
import { Question } from '../../components/survey-builder-parts/Question/Question.tsx';
import './SurveyBuilderPage.css';
import { AppRoute } from "../../const/AppRoute.ts";
import { SurveyTitle } from "../../components/survey-builder-parts/SurveyTitle/SurveyTitle.tsx";
import { ThemeSelector } from "../../components/survey-builder-parts/ThemeSelector/ThemeSelector.tsx";
import { EmptyQuestionItem } from "../../components/survey-builder-parts/EmptyQuestionItem/EmptyQuestionItem.tsx";
import { QuestionButtons } from "../../components/survey-builder-parts/QuestionButtons/QuestionButtons.tsx";
import { ColorPanel } from '../../components/survey-builder-parts/ColorPanel/ColorPanel.tsx';
import { IP_ADDRESS } from "../../config.ts";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";


export function SurveyBuilderPage() {
    const { id } = useParams<{ id: string }>();

    const [isTypeModalOpen, setTypeModalOpen] = useState<boolean>(false);
    const [isInputModalOpen, setInputModalOpen] = useState<boolean>(false);

    const [selectedQuestionType, setSelectedQuestionType] = useState<number>(0);
    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [addIndex, setAddIndex] = useState<number | null>(null);
    const [surveyTitle, setSurveyTitle] = useState<string>('');

    const [backgroundImage, setBackgroundImage] = useState<Theme>(
        { name: 'Стандартная тема', url: 'url(/images/default.jpg)' }
    );
    const [BackgroundSelectedColor, BackgroundSetSelectedColor] = useState<string>('#D9D9D9');
    const [QuestionSelectedColor, QuestionSetSelectedColor] = useState<string>('#FFFFFF');
    const [TextSelectedColor, TextSetSelectedColor] = useState<string>('#000000');

    useEffect(() => {
        if (id) {
            const fetchSurvey = async () => {
                try {
                    const response = await fetch(`http://${IP_ADDRESS}:8080/user/jenoshima42@despair.com/survey/${id}`);
                    if (!response.ok) {
                        throw new Error('Ошибка при загрузке опроса');
                    }
                    const data = await response.json();
                    setSurveyTitle(data.Name);
                    setQuestions(data.Survey);
                    setBackgroundImage(data.Theme);
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            };

            fetchSurvey();
        }
    }, [id]);

    const handleSelectQuestionType = (type: number) => {
        setSelectedQuestionType(type);
        setInputModalOpen(true);
        setTypeModalOpen(false);
    };

    const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substring(2, 9);
    };

    const handleSubmitQuestion = (question: string, options?: string[]) => {
        const newQuestion = {
            question,
            type: selectedQuestionType,
            options,
            questionId: generateUniqueId()
        };

        if (addIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions.splice(addIndex, 0, newQuestion);
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
            Theme: backgroundImage,
            Survey: questions
        };

        try {
            let response;
            if (id) {
                response = await fetch(`http://${IP_ADDRESS}:8080/survey/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch(`http://${IP_ADDRESS}:8080/user/jenoshima42@despair.com/survey`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const reorderedQuestions = Array.from(questions);
        const [movedItem] = reorderedQuestions.splice(result.source.index, 1); // Удаляем элемент из исходной позиции
        reorderedQuestions.splice(result.destination.index, 0, movedItem); // Вставляем элемент в новую позицию

        setQuestions(reorderedQuestions);
    };

    return (
        <div className={'builder-survey'}>
            <h1>Конструктор опросов</h1>

            <ColorPanel selectedColor={BackgroundSelectedColor} setSelectedColor={BackgroundSetSelectedColor} />
            <ColorPanel selectedColor={QuestionSelectedColor} setSelectedColor={QuestionSetSelectedColor} />
            <ColorPanel selectedColor={TextSelectedColor} setSelectedColor={TextSetSelectedColor} />


            <ThemeSelector backgroundImage={backgroundImage} setBackgroundImage={setBackgroundImage} />
            <div className='cover' style={{ backgroundImage: backgroundImage.url, backgroundSize: 'cover', height: 100 }}></div>
            <div className="questions-list" style={{ backgroundColor: BackgroundSelectedColor, backgroundSize: 'cover' }}>
            
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
                                                             style={{backgroundColor: QuestionSelectedColor}}>
                                                            <Question
                                                                question={question.question}
                                                                type={question.type}
                                                                textColor={TextSelectedColor}
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
            </div>
            <button className={'add-question-button'} onClick={() => setTypeModalOpen(true)}>Добавить вопрос</button>
            <Link to={AppRoute.MySurveys}>
                <button className={'save-survey-button'} onClick={handleSubmit}>Сохранить опрос</button>
            </Link>
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
        </div>
    );
}
