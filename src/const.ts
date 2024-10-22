import SingleChoiceQuestion from "./components/questions/single-choice-question/single-choice-question.tsx";
import MultipleChoiceQuestion from "./components/questions/multiple-choice-question/multiple-choice-question.tsx";
import TextQuestion from "./components/questions/text-question/text-question.tsx";
import NumberQuestion from "./components/questions/number-question/number-question.tsx";
import YesNoQuestion from "./components/questions/yes-no-question/yes-no-question.tsx";
import DateQuestion from "./components/questions/date-question/date-question.tsx";
import UrlQuestion from "./components/questions/url-question/url-question.tsx";
import FileQuestion from "./components/questions/file-question/file-question.tsx";
import SelectQuestion from "./components/questions/select-question/select-question.tsx";
import SliderQuestion from "./components/questions/slider-question/slider-question.tsx";
import React from "react";

export enum AppRoute {
    FormBuilder = '/editor',
    FormBuilderEdit = '/editor/:id',
    Login = '/login',
    Root = '/',
    Survey = '/survey',
    SurveyId = '/survey/:id',
    MySurveys = '/my-surveys'
}

export const componentMap: { [key: string]: React.FC<QuestionProps> } = {
    'Одиночный выбор': SingleChoiceQuestion,
    'Множественный выбор': MultipleChoiceQuestion,
    'Текст': TextQuestion,
    'Целое число': NumberQuestion,
    'Да/Нет': YesNoQuestion,
    'Дата': DateQuestion,
    'Ссылка': UrlQuestion,
    'Файл': FileQuestion,
    'Выпадающий список': SelectQuestion,
    'Шкала': SliderQuestion,
};
