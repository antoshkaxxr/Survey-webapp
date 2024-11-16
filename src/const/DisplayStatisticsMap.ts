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
    10: {component : Diagram}
};
