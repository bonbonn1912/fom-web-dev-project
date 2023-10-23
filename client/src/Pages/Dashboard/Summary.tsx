import { useState} from "react";
import {SlEnergy, SlClock, SlSpeedometer} from "react-icons/sl";
import { GiPathDistance } from "react-icons/gi";

interface MySummaryProps {
    totalDistance: number;
    totalCalories: number;
    totalTime: number;
}
const MySummary = ({totalDistance, totalCalories, totalTime}: MySummaryProps) => {
    let avgSpeed = 0;
    if(totalDistance === 0 || totalTime === 0){
        avgSpeed = 0;
    }else{
        //@ts-ignore
        avgSpeed = ((totalDistance/1000)/(totalTime/3600)).toFixed(2);
    }
    const [stats] = useState([
        { name: 'Total Distance', stat: `${(totalDistance/1000).toFixed(2)} Km`, icon: <GiPathDistance size={20}/> },
        { name: 'Total Calories', stat: totalCalories, icon: <SlEnergy size={20}/> },
        { name: 'Total Time spent', stat: `${(totalTime/3600).toFixed(1)} h`, icon: <SlClock size={20}/> },
        { name: 'Average Speed', stat: `${avgSpeed} Km/h`, icon: <SlSpeedometer size={20}/> },

    ])

    return (
        <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">Overall Stats</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 hover:bg-gray-50">


                        <dt className="truncate text-sm font-medium text-gray-500 flex items-center">{item.icon}<div className="ml-1">{item.name}</div></dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}

export default MySummary;
