import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import HoverLine from "./HoverLine.ts";



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

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
                max: Math.ceil((Math.max(...speed) * 4.1) / 10) * 10,
                type: "linear",
                position: "left",
                stack: "activity",
                stackWeight: 2,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            },
            y1: {
                position: "left",
                type: "linear",
                stack: "activity",
                offset: true,
                stackWeight: 6,
                labels: power,
                min: 0,
                max: Math.ceil((Math.max(...power) * 1.1) / 10) * 10,
                cubicInterpolationMode: 'monotone',
                tension: 0.4

            },
            y2: {
                position: "left",
                type: "linear",
                stack: "activity",
                offset: true,
                stackWeight: 6,
                labels: altitude,
                min:0,
                max: Math.ceil((Math.max(...altitude) * 1.1) / 10) * 10,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                //max: 500
            },
            y3: {
                position: "left",
                type: "linear",
                stack: "activity",
                offset: true,
                stackWeight: 6,
                labels: heartRate,
              //  min: Math.min(...heartRate)-10,
                min: 0,
                max: Math.ceil((Math.max(...heartRate) * 1.1) / 10) * 10,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                //max: 500
            },
            y4: {
                position: "left",
                type: "linear",
                stack: "activity",
                offset: true,
                stackWeight: 6,
                labels: cadence,
                min: 0,
                max: Math.ceil((Math.max(...cadence) * 1.1) / 10) * 10,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
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
            },
            {
                label: 'Watts',
                data: power,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 0,
                yAxisID: 'y1',
            },
            {
                label: 'Altitude',
                data: altitude,
                backgroundColor: "rgba(128,0,128,0.3)",
                borderColor: "rgba(128,0,128,1)",
                pointRadius: 0,
                yAxisID: 'y2',
            },
            {
                label: 'Heart Rate',
                data: heartRate,
                backgroundColor: "rgba(0,128,0,0.3)",
                borderColor: "rgba(0,128,0,1)",
                pointRadius: 0,
                yAxisID: 'y3',
            },
            {
                label: 'Cadence',
                data: cadence,
                backgroundColor: "rgba(0,0,0,0.3)",
                borderColor: "rgba(0,0,0,1)",
                pointRadius: 0,
                yAxisID: 'y4',
            },
        ],
    };


    //@ts-ignore
    return <Line plugins={[hoverLine]} options={options} data={data} />;
}

export default LineChart;
