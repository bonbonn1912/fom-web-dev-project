import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

 interface DonutProps {
     timeAboveFTP: number;
     timeBelowFTP: number;
 }
const Donut = ({timeAboveFTP, timeBelowFTP} : DonutProps) => {
    const data = {
        labels: ['Above FTP', 'Below FTP'],
        datasets: [
            {
                label: '% of time spent in zone',
                data: [timeAboveFTP, timeBelowFTP],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        console.log(context);
                        const label = context.label || '';
                        const value = context.parsed;
                        const percentage = ((value / (timeAboveFTP + timeBelowFTP)) * 100).toFixed(2); // Umrechnung in Prozent
                        return `${label}: ${percentage}%`;
                    }
                }
            }
        }
    };

    return <Doughnut data={data} options={options} />;
}

export default Donut;