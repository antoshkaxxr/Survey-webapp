
import {DisplayStatisticsMap} from "../../../const/DisplayStatisticsMap.ts";

interface BaseStatisticProps{
    questionInfo: SurveyQuestion;
    answers: StatisticVariant[];
    onClose: () => void;
}
export function BaseStatistic({questionInfo, answers, onClose} : BaseStatisticProps) {

    const { component: StatisticComponent } = DisplayStatisticsMap[questionInfo.type];
    return (
        <div>
            <button onClick={onClose}></button>
            <StatisticComponent
                question = {questionInfo.question}
                answers = {answers}>
            </StatisticComponent>
    </div>);
}
