import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  Decimation
} from 'chart.js';
import { Line } from 'react-chartjs-2';




ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Decimation
);





interface HeartRateChartProps {
    heartRate: number[];
    seconds: number[];
}
const HeartRateChart = ({heartRate, seconds} : HeartRateChartProps) => {

    const last60Seconds = seconds.slice(-60);
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales:{
            x: {
                ticks: {
                    maxTicksLimit: 4,
                },
                display: true,
            },
            y0: {
                position: "left",
                type: "linear",
                stack: "activity",
                offset: true,
                labels:seconds,
                min: Math.max(Math.ceil(Math.min(...heartRate) / 10) * 10-20,0),
                max: Math.ceil(Math.max(...heartRate) / 10) * 10+10,
                cubicInterpolationMode: 'monotone',
                tension: 1,

            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Your Workout',
            },
        },
    };
    const data = {
        labels: last60Seconds.map((sekunden: number) => {
            if(sekunden < 60){
                return `${sekunden} s`
            }else{
                return `${Math.floor(sekunden / 60)} min ${sekunden % 60} s`
            }
        }),
        datasets: [
            {
                label: 'Heart Rate',
                data:  heartRate.map((num, index) => {
                    return {
                        x: index,
                        y: num,
                        hidden: num === 0  // Setzt hidden: true, wenn der Wert 0 ist
                    }
                }),
                backgroundColor: "rgba(255,31,31,0.3)",
                borderColor: "rgb(255,0,0)",
                pointRadius: 0,
                borderWidth: 1,
                yAxisID: 'y0',
            },
        ],
    };


    //@ts-ignore
    return <Line options={options} data={data} />;
}

export default HeartRateChart
