import {ClockIcon,} from '@heroicons/react/24/outline'
import {getWorkoutArray} from "../../helper/workout.ts";
import {useEffect, useState} from "react";
import {MdDirectionsBike} from "react-icons/md";
import { TbBrandZwift } from 'react-icons/tb';
import Map from './Map.tsx';
import 'leaflet/dist/leaflet.css';
import {convertTimestamp} from "../../helper/time.ts";

const DemoActions = [
    {
        title: 'Request time off',
        href: '#',
        activity: '',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
        distance: '',
        map_polyline: '',
        elapsed_time: '',
        start_date: '',
        calories: '',
        average_speed: '',
        max_speed: '',
        average_watts: '',
    }
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const Workout = () => {
    const [actions, setActions] = useState(DemoActions);
    const [loading, setLoading] = useState(true);
    const initWorkoutArray = async () => {
        const workouts = await getWorkoutArray();
        const newWorkouts = workouts.map((singleWorkout: any) => {
        const icon = singleWorkout.type === "Ride" ? MdDirectionsBike : TbBrandZwift;

            return {
                title: singleWorkout.name,
                href: '#',
                icon: icon,
                iconForeground: 'text-teal-700',
                iconBackground: 'bg-teal-50',
                ...singleWorkout
            }
        })
        setActions(newWorkouts);
        setLoading(false)
    }

    useEffect(() => {
        initWorkoutArray()
    }, []);

    const forward = (id: string) =>{
        if(window.innerWidth > 640) { // 640px ist der Standardbruchpunkt für "sm" in Tailwind CSS
            window.location.href = `/dashboard/workouts/${id}`;
        }
    }

    if (loading) {
        return <div>loading</div>
    } else {
        return (
            // only return this if isLoading is false
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 md:ml-10 md:mr-10">
                {actions.map((action, actionIdx) => (
                    <div
                        key={action.title}
                        onClick={() => forward(action.activity)}
                        className={classNames(
                            actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                            actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                            actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                            'group relative bg-white hover:bg-gray-100 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 md:grid md:grid-cols-3'
                        )}
                    >
                        <div className="">
                            <div className="flex h-fit items-center">
                                <span
                                    className={classNames(
                                        action.iconBackground,
                                        action.iconForeground,
                                        'inline-flex rounded-lg p-3 ring-4 ring-white'
                                    )}
                                >

              <action.icon className="h-6 w-6" aria-hidden="true"/>

            </span>
                <h3 className="text-base font-semibold leading-6 text-gray-900 ml-2">
                    <a href={action.href} className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                            <span className="absolute inset-0" aria-hidden="true"/>
                                {action.title}
                    </a>
                </h3>
                </div>
                    <div>
                        <p className="md:pl-14 pl-0 mt-1 text-sm text-gray-500">
                            {`Datum: ${convertTimestamp(action.start_date)}`}
                        </p>
                    </div>
                    </div>
                        <div className="mt-2">
                            <p className="mt-2 text-sm text-gray-500">
                                {`Distanz: ${Math.floor(parseInt(action.distance) / 1000)} km`}
                            </p>
                            <p className="mt-2 text-sm text-gray-500 hover:text-blue-500">
                                {`⌀-Geschwindigkeit: ${Math.floor(parseInt(action.average_speed) * 3.6)} km/h`}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                {`⌀-Leistung: ${Math.floor(parseInt(action.average_watts))} Watt`}
                            </p>
                        </div>
                        <div className="">
                            <div className="hidden md:block">
                                <Map polyString={action.map_polyline} width={"200px"} height={"100px"} controllables={false} zIndex={0}/>
                            </div>
                        </div>
                        <div className="block sm:hidden">
                        <a href={`/dashboard/workouts/${action.activity}`}>
                        <span className="absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">

                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
                            </svg>

                        </span>
                        </a>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}
export default Workout