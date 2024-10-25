import {SingleChoiceQuestion} from "./components/questions/SingleChoiceQuestion/SingleChoiceQuestion.tsx";
import {MultipleChoiceQuestion} from "./components/questions/MultipleChoiceQuestion/MultipleChoiceQuestion.tsx";
import {TextQuestion} from "./components/questions/TextQuestion/TextQuestion.tsx";
import {NumberQuestion} from "./components/questions/NumberQuestion/NumberQuestion.tsx";
import {YesNoQuestion} from "./components/questions/YesNoQuestion/YesNoQuestion.tsx";
import {DateQuestion} from "./components/questions/DateQuestion/DateQuestion.tsx";
import {UrlQuestion} from "./components/questions/UrlQuestion/UrlQuestion.tsx";
import {FileQuestion} from "./components/questions/FileQuestion/FileQuestion.tsx";
import {SelectQuestion} from "./components/questions/SelectQuestion/SelectQuestion.tsx";
import {SliderQuestion} from "./components/questions/SliderQuestion/SliderQuestion.tsx";
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
