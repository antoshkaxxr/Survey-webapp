import {DisplayStatisticsByNameMap, NameDisplayStatisticsMap} from "../../../const/DisplayStatisticsMap.ts";
import "./BaseStatistic.css";
import {useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Legend
);
interface BaseStatisticProps{
    questionInfo: SurveyQuestion;
    answers: StatisticVariant[];
    onClose: () => void;
}

export function BaseStatistic({questionInfo, answers, onClose} : BaseStatisticProps) {
    const [indexWayStatisticsDisplayed, setIndexWayStatisticsDisplayed] = useState<number>(0);
    const handleChangeWayStatisticsDisplayed = (id : number ) => {
        setIndexWayStatisticsDisplayed(id);
    };
    const namesWayStatisticsDisplay = NameDisplayStatisticsMap[questionInfo.type]['componentsName'];
    const currNameWayStatisticsDisplay = namesWayStatisticsDisplay[indexWayStatisticsDisplayed];
    const StatisticComponent  = DisplayStatisticsByNameMap[currNameWayStatisticsDisplay]['component'];
    function* createSequenceGenerator(length: number): Generator<number> {
        for (let i = 0; i < length; i++) {
            yield i;
        }
    }
    const indexesWaysStatisticsDisplay = [...createSequenceGenerator(namesWayStatisticsDisplay.length)]
    return (
        <div className={"statistic-base"}>
            <div className={"buttons"}>
                <div className="button-way-displayed-container">
                    {indexesWaysStatisticsDisplay.map((index) => (
                        <button
                            className={"button-way-displayed"}
                            key={index}
                            onClick={() => handleChangeWayStatisticsDisplayed(index)}>
                            {DisplayStatisticsByNameMap[namesWayStatisticsDisplay[index]]['displayName']}
                        </button>
                    ))}
                </div>
                <button className={"close-button-container"} onClick={onClose}>
                    <img src="/icons/icon-close.svg" alt="Закрыть статистику"/>
                </button>
            </div>

            <StatisticComponent
                question={questionInfo.question}
                answers={answers}
            />
        </div>
    );
}
