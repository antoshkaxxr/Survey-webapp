import {Pie} from "react-chartjs-2";

import "./PieStatistic.css"



export function PieStatistic({ question, answers }: DisplayStatisticsProps) {
    const labels = answers.map((a) => a.variant);
    const data = answers.map((a) => a.amountSelected);

    function generateColors(numColors: number, alpha: number, minDiff: number): string[] {
        const colors: string[] = [];
        let r = 0;
        let g = 0;
        let b = 0;
        let prevR = -1;
        let prevG = -1;
        let prevB = -1;


        for (let i = 0; i < numColors; i++) {
            do {
                r = Math.floor(120 + Math.random() * 156);
                g = Math.floor(120 + Math.random() * 156);
                b = Math.floor(120 + Math.random() * 156);
            } while (i > 0 && !isColorDifferentEnough(r, g, b, prevR, prevG, prevB, minDiff));

            const maxBrightness = 220;
            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
            if (brightness > maxBrightness) {
                const factor = maxBrightness / brightness;
                r *= factor;
                g *= factor;
                b *= factor;
            }

            colors.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);

            prevR = r;
            prevG = g;
            prevB = b;
        }
        return colors;
    }


    function isColorDifferentEnough(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, minDiff: number): boolean {
        return (
            Math.abs(r1 - r2) >= minDiff &&
            Math.abs(g1 - g2) >= minDiff &&
            Math.abs(b1 - b2) >= minDiff
        );
    }

    const numColors = answers.length;
    const backgroundColor = generateColors(numColors, 0.6, 35);
    const borderColor = generateColors(numColors, 1, 35);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: question,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={chartData} className={"pie-statistic"}/>;
}
