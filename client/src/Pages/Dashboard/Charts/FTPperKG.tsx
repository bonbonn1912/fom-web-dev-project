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
interface IBoxThreshold {
    minBox1: number;
    maxBox1: number;
    minBox2: number;
    maxBox2: number;
    minBox3: number;
    maxBox3: number;
    minBox4: number;
    maxBox4: number;
    minBox5: number;
    maxBox5: number;
    minBox6: number;
    maxBox6: number;
    minBox7: number;
    maxBox7: number;
    minBox8: number;
    maxBox8: number;
    minBox9: number;
    maxBox9: number;
}

interface IThresholds {
    male: IBoxThreshold;
    female: IBoxThreshold;
    other: IBoxThreshold;
}
const thresholds: IThresholds = {
    male:{
        minBox1: 0,
        maxBox1: 1.4,
        minBox2: 1.4,
        maxBox2: 1.9,
        minBox3: 1.9,
        maxBox3: 2.6,
        minBox4: 2.6,
        maxBox4: 3.2,
        minBox5: 3.2,
        maxBox5: 3.8,
        minBox6: 3.8,
        maxBox6: 4.5,
        minBox7: 4.5,
        maxBox7: 5.1,
        minBox8: 5.1,
        maxBox8: 5.8,
        minBox9: 5.8,
        maxBox9: 7,
    },
    other: {
            minBox1: 0,
            maxBox1: 1.4,
            minBox2: 1.4,
            maxBox2: 1.9,
            minBox3: 1.9,
            maxBox3: 2.6,
            minBox4: 2.6,
            maxBox4: 3.2,
            minBox5: 3.2,
            maxBox5: 3.8,
            minBox6: 3.8,
            maxBox6: 4.5,
            minBox7: 4.5,
            maxBox7: 5.1,
            minBox8: 5.1,
            maxBox8: 5.8,
            minBox9: 5.8,
            maxBox9: 7,
        },
    female: {
            minBox1: 0,
            maxBox1: 1.1,
            minBox2: 1.1,
            maxBox2: 1.7,
            minBox3: 1.7,
            maxBox3: 2.3,
            minBox4: 2.3,
            maxBox4: 2.8,
            minBox5: 2.8,
            maxBox5: 3.4,
            minBox6: 3.4,
            maxBox6: 4.0,
            minBox7: 4.0,
            maxBox7: 4.6,
            minBox8: 4.6,
            maxBox8: 5.1,
            minBox9: 5.1,
            maxBox9: 7,
    }
}

const returnBoxForGender = (gender: 'male' | 'female' | 'other') => {
    const totalBoxes = 9;
    const colorIncrement = 240 / (totalBoxes - 1);

    if (!thresholds.hasOwnProperty(gender)) {
        throw new Error(`Unknown gender: ${gender}`);
    }
    const selectedThresholds: IBoxThreshold = thresholds[gender];

    return {
        box1: {
            type: 'box',
            xMin: 0,
            xMax: 100,
            borderColor: 'transparent',
            borderWidth: 0,
            yMin:  selectedThresholds.minBox1,
            yMax:  selectedThresholds.maxBox1,
            backgroundColor: `hsla(0, 100%, 50%, 0.25)` // Start with red
        },
        box2: {
            type: 'box',
            xMin: 0,
            xMax: 100,
            borderColor: 'transparent',
            borderWidth: 0,
            yMin:  selectedThresholds.minBox2,
            yMax:  selectedThresholds.maxBox2,
            backgroundColor: `hsla(${colorIncrement}, 100%, 50%, 0.25)`
        },
        box3: {
            type: 'box',
            xMin: 0,
            xMax: 100,
            borderColor: 'transparent',
            borderWidth: 0,
            yMin:  selectedThresholds.minBox3,
            yMax:  selectedThresholds.maxBox3,
            backgroundColor: `hsla(${colorIncrement * 2}, 100%, 50%, 0.25)`
        },
        box4: {
            type: 'box',
            xMin: 0,
            xMax: 100,
            borderColor: 'transparent',
            borderWidth: 0,
            yMin:  selectedThresholds.minBox4,
            yMax:  selectedThresholds.maxBox4,
            backgroundColor: `hsla(${colorIncrement * 3}, 100%, 50%, 0.25)`
        },
        box5: {
            type: 'box',
            xMin: 0,
            xMax: 100,
            borderColor: 'transparent',
            borderWidth: 0,
            yMin:  selectedThresholds.minBox5,
            yMax:  selectedThresholds.maxBox5,
            backgroundColor: `hsla(${colorIncrement * 4}, 100%, 50%, 0.25)`
        },
        box6: {
            type: 'box',
            xMin: 0,
            xMax: 100,
            borderColor: 'transparent',
            borderWidth: 0,
            yMin:  selectedThresholds.minBox6,
            yMax:  selectedThresholds.maxBox6,
            backgroundColor: `hsla(${colorIncrement * 5}, 100%, 50%, 0.25)`
        },
        box7: {
            type: 'box',
            xMin: 0,
            xMax: 100,
            borderColor: 'transparent',
            borderWidth: 0,
            yMin:  selectedThresholds.minBox7,
            yMax:  selectedThresholds.maxBox7,
            backgroundColor: `hsla(${colorIncrement * 6}, 100%, 50%, 0.25)`
        },
        box8: {
            type: 'box',
            xMin: 0,
            xMax: 100,
            borderColor: 'transparent',
            borderWidth: 0,
            yMin:  selectedThresholds.minBox8,
            yMax:  selectedThresholds.maxBox8,
            backgroundColor: `hsla(${colorIncrement * 7}, 100%, 50%, 0.25)`
        },
        box9: {
            type: 'box',
            xMin: 0,
            xMax: 100,
            borderColor: 'transparent',
            borderWidth: 0,
            yMin:  selectedThresholds.minBox9,
            yMax:  selectedThresholds.maxBox9,
            backgroundColor: `hsla(240, 100%, 50%, 0.25)` // End with dark blue
        }
    };
};


interface FTPperKGProps {
    values: number[];
    labels: string[];
    gender: 'male' | 'female' | 'other',
}
const FTPperKG = ({values, labels, gender}: FTPperKGProps) => {
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
    const data = {
            labels: paddedLabels,
            datasets: [{
                label: 'Your FTP per KG Progress',
                data: paddedData,
                fill: false,
                borderColor: 'rgb(0, 0, 0)',
                tension: 0.1
            }]
        };

    const options: any = {
        maintainAspectRatio: false,
        plugins: {
            annotation: {
                annotations: returnBoxForGender(gender),
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default FTPperKG;
