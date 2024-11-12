import {DisplayStatisticsMap} from "../../../const/DisplayStatisticsMap.ts";
import "./BaseStatistic.css"
interface BaseStatisticProps{
    questionInfo: SurveyQuestion;
    answers: StatisticVariant[];
    onClose: () => void;
}
export function BaseStatistic({questionInfo, answers, onClose} : BaseStatisticProps) {


    const { component: StatisticComponent } = DisplayStatisticsMap[questionInfo.type];
    return (
        <div className={"statistic-base"}>
            <button className={"close-button-container"} onClick={onClose}>
                <img src="/icons/icon-close.svg" alt="Закрыть статистику"/>
            </button>
            <StatisticComponent
                question={questionInfo.question}
                answers={answers}
            />
        </div>
    );
}
