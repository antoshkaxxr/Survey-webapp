import React from "react";
import {Diagram} from "../components/display-statistics/Diagram/Diagram.tsx";
import {List} from "../components/display-statistics/List/List.tsx";



export const DisplayStatisticsMap: { [key: number]: {component: React.FC<DisplayStatisticsProps>} } = {
    1: {component : Diagram},
    2: {component : Diagram},
    3: {component : List},
    4: {component : Diagram},
    5: {component : Diagram},
    6: {component : Diagram},
    7: {component : List},
    8: {component : List},
    9: {component : Diagram},
    10: {component : Diagram},
    /**
    1: { name: 'Одиночный выбор', component: SingleChoiceQuestion, icon: "/icons/single-choice.svg" },
    2: { name: 'Множественный выбор', component: MultipleChoiceQuestion, icon: "/icons/multiple-choice.svg" },
    3: { name: 'Текст', component: TextQuestion, icon: "/icons/text.svg" },
    4: { name: 'Целое число', component: NumberQuestion, icon: "/icons/integer.svg" },
    5: { name: 'Да/Нет', component: YesNoQuestion, icon: "/icons/yes-no.svg" },
    6: { name: 'Дата', component: DateQuestion, icon: "/icons/date.svg" },
    7: { name: 'Ссылка', component: UrlQuestion, icon: "/icons/link.svg" },
    8: { name: 'Файл', component: FileQuestion, icon: "/icons/file.svg" },
    9: { name: 'Выпадающий список', component: SelectQuestion, icon: "/icons/dropdown.svg" },
    10: { name: 'Шкала', component: SliderQuestion, icon: "/icons/scale.svg" }**/
};