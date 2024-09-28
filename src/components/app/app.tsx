import { useState } from 'react';
import './app.css';
import SingleChoiceQuestion from "../questions/single-choice-question/single-choice-question.tsx";
import MultipleChoiceQuestion from "../questions/multiple-choice-question/multiple-choice-question.tsx";
import TextQuestion from "../questions/text-question/text-question.tsx";
import NumberQuestion from "../questions/number-question/number-question.tsx";
import YesNoQuestion from "../questions/yes-no-question/yes-no-question.tsx";
import DateQuestion from "../questions/date-question/date-question.tsx";
import UrlQuestion from "../questions/url-question/url-question.tsx";
import FileQuestion from "../questions/file-question/file-question.tsx";
import SelectQuestion from "../questions/select-question/select-question.tsx";
import SliderQuestion from "../questions/slider-question/slider-question.tsx";

function App() {
      const [answers, setAnswers] = useState({});

      const handleAnswerChange = (questionId: number, question: string, answer: string) => {
            setAnswers(prevAnswers => ({
                  ...prevAnswers,
                  [questionId]: {
                      question: question,
                      answer: answer
                  }
            }));
      };

      return (
          <>
                <h1>Преподаватели МатМеха</h1>

                <SingleChoiceQuestion
                    question={'Кто такой Хлопин?'}
                    options={['Историк', 'Физик', 'Математик', 'Биолог']}
                    questionId={1111}
                    onAnswerChange={handleAnswerChange}
                />

                <MultipleChoiceQuestion
                    question={'Кто такой Косолобов?'}
                    options={['Машина', 'Математик', 'Физик', 'Препод']}
                    questionId={2222}
                    onAnswerChange={handleAnswerChange}
                />

                <TextQuestion
                    question={'Что Вы думаете о практиках по терверу/матстату?'}
                    questionId={3333}
                    onAnswerChange={handleAnswerChange}
                />

                <NumberQuestion
                    question={'На каком Вы курсе? Введите только цифру'}
                    questionId={4444}
                    onAnswerChange={handleAnswerChange}
                />

                <YesNoQuestion
                    question={'Вам нравится Ваша секция по физкультуре?'}
                    questionId={5555}
                    onAnswerChange={handleAnswerChange}
                />

                <DateQuestion
                    question={'Укажите Вашу дату рождения:'}
                    questionId={6666}
                    onAnswerChange={handleAnswerChange}
                />

                <UrlQuestion
                    question={'Предоставьте ссылку на Ваш проект на GitLab'}
                    questionId={7777}
                    onAnswerChange={handleAnswerChange}
                />

                <FileQuestion
                    question={'Прикрепите базу ответов по БЖД'}
                    questionId={8888}
                    onAnswerChange={handleAnswerChange}
                />

                <SelectQuestion
                    question={'Выберите Вашу страну проживания'}
                    options={['Россия', 'США', 'Япония', 'Китай', 'Франция']}
                    questionId={9999}
                    onAnswerChange={handleAnswerChange}
                />

                <SliderQuestion
                    question={'Оцените от 1 до 10 МатМех'}
                    min={1}
                    max={10}
                    questionId={11111}
                    onAnswerChange={handleAnswerChange}
                />

                <div>
                      <h2>Ответы:</h2>
                      <pre>{JSON.stringify(answers, null, 2)}</pre>
                </div>
          </>
      );
}

export default App;
