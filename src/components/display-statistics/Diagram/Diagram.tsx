import { Bar } from "react-chartjs-2";
import {
    ChartOptions,
    ChartData
} from 'chart.js';
import "./Diagram.css"



export function Diagram({ question, answers }: DisplayStatisticsProps) {
    const labels = answers.map((a) => a.variant);
    const data = answers.map((a) => a.amountSelected);

    const barChartData: ChartData<'bar', number[], unknown> = {
        labels: labels,
        datasets: [
            {
                label: question,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        plugins: {
            title: {
                display: true,
                text: question,
                font: {
                    size: 32,
                    weight: 'bold'
                },
            },
            legend: {
                display: false
            },
        },
    };

    return (
        <div >
            <Bar className="diagram-statistic"
                data={barChartData}
                options={options}
            />
        </div>
    );
}
