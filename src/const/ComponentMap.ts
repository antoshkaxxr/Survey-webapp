import {SingleChoiceQuestion} from "../components/questions/SingleChoiceQuestion/SingleChoiceQuestion.tsx";
import {MultipleChoiceQuestion} from "../components/questions/MultipleChoiceQuestion/MultipleChoiceQuestion.tsx";
import {TextQuestion} from "../components/questions/TextQuestion/TextQuestion.tsx";
import {NumberQuestion} from "../components/questions/NumberQuestion/NumberQuestion.tsx";
import {YesNoQuestion} from "../components/questions/YesNoQuestion/YesNoQuestion.tsx";
import {DateQuestion} from "../components/questions/DateQuestion/DateQuestion.tsx";
import {UrlQuestion} from "../components/questions/UrlQuestion/UrlQuestion.tsx";
import {FileQuestion} from "../components/questions/FileQuestion/FileQuestion.tsx";
import {SelectQuestion} from "../components/questions/SelectQuestion/SelectQuestion.tsx";
import {SliderQuestion} from "../components/questions/SliderQuestion/SliderQuestion.tsx";
import React from "react";

export const ComponentMap: { [key: number]: { name: string, component: React.FC<QuestionProps>, icon: string } } = {
    1: { name: 'Одиночный выбор', component: SingleChoiceQuestion, icon: "/icons/single-choice.svg" },
    2: { name: 'Множественный выбор', component: MultipleChoiceQuestion, icon: "/icons/multiple-choice.svg" },
    3: { name: 'Текст', component: TextQuestion, icon: "/icons/text.svg" },
    4: { name: 'Целое число', component: NumberQuestion, icon: "/icons/integer.svg" },
    5: { name: 'Да/Нет', component: YesNoQuestion, icon: "/icons/yes-no.svg" },
    6: { name: 'Дата', component: DateQuestion, icon: "/icons/date.svg" },
    7: { name: 'Ссылка', component: UrlQuestion, icon: "/icons/link.svg" },
    8: { name: 'Файл', component: FileQuestion, icon: "/icons/file.svg" },
    9: { name: 'Выпадающий список', component: SelectQuestion, icon: "/icons/dropdown.svg" },
    10: { name: 'Шкала', component: SliderQuestion, icon: "/icons/scale.svg" }
};
