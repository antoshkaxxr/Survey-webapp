import React from "react";
import {Diagram} from "../components/display-statistics/Diagram/Diagram.tsx";
import {List} from "../components/display-statistics/List/List.tsx";
import {PieStatistic} from "../components/display-statistics/PieStatistic/PieStatistic.tsx";

export const DisplayStatisticsByNameMap: {
    [key: string]: { component: React.FC<DisplayStatisticsProps>, displayName: string } } = {
    'Diagram': {component: Diagram, displayName: 'Диаграмма'},
    'List': {component: List, displayName: 'Список'},
    'Pie': {component: PieStatistic, displayName: 'Круговая диаграмма'},
};

export const NameDisplayStatisticsMap: { [key: number]: { componentsName: string[] } } = {
    1: { componentsName: ['Diagram', 'Pie'] },
    2: { componentsName: ['Diagram', 'Pie'] },
    3: { componentsName: ['List'] },
    4: { componentsName: ['Diagram', 'Pie'] },
    5: { componentsName: ['Diagram', 'Pie'] },
    6: { componentsName: ['Diagram', 'Pie'] },
    7: { componentsName: ['Diagram', 'Pie'] },
    8: { componentsName: ['List'] },
    9: { componentsName: ['Diagram', 'Pie'] },
    10: { componentsName: ['List'] }
};
