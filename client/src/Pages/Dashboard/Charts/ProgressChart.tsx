import 'chartjs-plugin-annotation';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
);




interface ProgressChartProps {
    labels: string[];
    values: number[];
    title?: string;
    color?: string;
}


const ProgressChart = ({values, labels, title, color} :ProgressChartProps) => {
    let paddedData = new Array(10).fill(null);
    let startIndex = Math.floor((10 - values.length) / 2);
    for (let i = 0; i < values.length; i++) {
        paddedData[startIndex + i] = values[i];
    }
    let paddedLabels = new Array(10).fill("");
    startIndex = Math.floor((10 - labels.length) / 2);
    for (let i = 0; i < labels.length; i++) {
        paddedLabels[startIndex + i] = labels[i];
    }
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                min: Math.max(Math.min(...values) - 10,0),
                max: Math.max(...values) + 10,
            }
        },
        plugins: {
            title: {
                display: true,
                text: `${title}`,
            },
            legend: {
                display: false,
            }
        }
    }

    const data = {
        labels: paddedLabels,
        datasets: [{
            label: null,
            data: paddedData,
            fill: false,
            borderColor: color,
            tension: 0.4
        }]
    }
    // @ts-ignore
    return (<><Line options={options} data={data}/></>
    )
}

export default ProgressChart;
