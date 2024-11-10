import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function Diagram({ question, answers }: DisplayStatisticsProps) {
    console.log(question);
    console.log(answers);
    const labels = answers.map((a) => a.variant);
    const data = answers.map((a) => a.amountSelected);

    const barChartData: ChartData<'bar', number[], unknown> = {
        labels: labels,
        datasets: [
            {
                label: 'Sales',
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
            },
            legend: {
                display: true,
                position: "top",
            },
        },
    };

    return (
        <div>
            <Bar
                data={barChartData}
                options={options}
            />
        </div>
    );
}