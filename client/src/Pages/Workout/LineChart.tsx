import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    DecimationOptions, Decimation
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





interface LineChartProps {
    speed: number[];
    power: number[];
    cadence: number[];
    altitude: number[];
    heartRate: number[];
}
const LineChart = ({speed, power, cadence, altitude, heartRate} : LineChartProps) => {
    const formatYLabel = (label: number[]) => {
        return label.map((sekunden: number) => {
            const stunden = Math.floor(sekunden / 3600); // Eine Stunde hat 3600 Sekunden
            const minuten = Math.floor((sekunden % 3600) / 60); // Die verbleibenden Minuten
            return `${stunden}:${minuten.toString().padStart(2, "0")}h`;
        });
    }
    const decimation: DecimationOptions = {
        enabled: true,
        algorithm: 'lttb',
        samples: 10,
        threshold: 100,
    };
    const labels = formatYLabel( Array.from(Array(speed.length).keys()))
        Array.from(Array(speed.length).keys())
    const hoverLine = {
        id: "hoverline",
        afterDatasetsDraw(chart: any) {
            const {
                ctx,
                _active,
                chartArea: { top, bottom},
            } = chart;
            if (_active.length > 0) {
                ctx.save();
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = "rgba(0,0,0,1)";
                ctx.setLineDash([ctx.height, .5]);
                ctx.moveTo(_active[0].element.x, top);
                ctx.lineTo(_active[0].element.x, bottom);
                ctx.stroke();
                ctx.closePath();
            }
        },
    }
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales:{
            x: {
                ticks: {
                    maxTicksLimit: 10,
                },
                display: true,
            },
            y0:{
                min: 0,
                labels: speed,
                borderWidth: 1,
                max: Math.ceil((Math.max(...speed) * 4.1) / 10) * 10,
                type: "linear",
                position: "left",
                stack: "activity",
                stackWeight: 5,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                title: {
                    display: true,
                    text: 'Speed'
                }
            },
            y1: {
                position: "left",
                type: "linear",
                stack: "activity",
                offset: true,
                stackWeight: 5,
                labels: power,
                min: 0,
                max: Math.ceil((Math.max(...power) * 1.1) / 10) * 10,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                title: {
                    display: true,
                    text: 'Power'
                }

            },
            y2: {
                position: "left",
                type: "linear",
                stack: "activity",
                offset: true,
                stackWeight: 8,
                labels: altitude,
                min: Math.max(Math.min(...altitude)-5, 0),
                max: Math.ceil((Math.max(...altitude) * 1.1) / 10) * 10,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                title: {
                    display: true,
                    text: 'Altitude'
                }
                //max: 500
            },
            y3: {
                position: "left",
                type: "linear",
                stack: "activity",
                offset: true,
                stackWeight: 10,
                labels: heartRate,

              //  min: Math.min(...heartRate)-10,
                min: Math.min(...heartRate)-10,
                max: Math.ceil((Math.max(...heartRate) * 1.1) / 10) * 10,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                title: {
                    display: true,
                    text: 'Heart Rate'
                }
            },
            y4: {
                position: "left",
                type: "linear",
                stack: "activity",
                offset: true,

                stackWeight: 3,
                labels: cadence,
                min: 0,
                max: Math.max(...cadence) +5,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                title: {
                    display: true,
                    text: 'Cadence'
                }
                //max: 500
            },
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Your Workout',
            },
            annotation:{
                annotations: {
                    line1: {
                        display: true,
                        type: 'line',
                        yMin: 600,
                        yMax: 0,
                        borderColor: 'rgb(255,0,54)',
                        borderWidth: 2,

                    }
                }
            }
        },
    };
    const data = {
       labels: labels,
        datasets: [
            {
                label: 'speed',
                data: speed.map((value) => value * 3.6),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 0,
                yAxisID: 'y0',
                borderWidth: 1,
            },
            {
                label: 'Watts',
                data: power,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 0,
                yAxisID: 'y1',
                borderWidth: 1,
            },
            {
                label: 'Altitude',
                data: altitude,
                backgroundColor: "rgba(128,0,128,0.3)",
                borderColor: "rgba(128,0,128,1)",
                pointRadius: 0,
                yAxisID: 'y2',
                borderWidth: 1,
            },
            {
                label: 'Heart Rate',
                data: heartRate,
                backgroundColor: "rgba(0,128,0,0.3)",
                borderColor: "rgba(0,128,0,1)",
                pointRadius: 0,
                borderWidth: 1,
                yAxisID: 'y3',
            },
            {
                label: 'Cadence',
                data: cadence,
                backgroundColor: "rgba(0,0,0,0.3)",
                borderColor: "rgba(0,0,0,1)",
                pointRadius: 0,
                yAxisID: 'y4',
                borderWidth: 1,
            },
        ],
    };


    //@ts-ignore
    return <Line plugins={[hoverLine, decimation]} options={options} data={data} />;
}

export default LineChart;
