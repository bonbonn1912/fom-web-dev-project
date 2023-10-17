import {
    ClockIcon,
} from '@heroicons/react/24/outline'
import { getWorkoutArray } from "../../helper/workout.ts";
import {useEffect, useState} from "react";
import {MdDirectionsBike} from "react-icons/md";
import Map from './Map.tsx';
import 'leaflet/dist/leaflet.css';
const DemoActions = [
    {
        title: 'Request time off',
        href: '#',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
        distance: '',
        map_polyline: ''

    }
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const Workout = () => {
    const [ actions, setActions ] = useState(DemoActions);
    const [ loading , setLoading ] = useState(true);
    const initWorkoutArray = async () =>{
        const workouts = await getWorkoutArray();
        console.log(workouts);
        const newWorkouts = workouts.map((singleWorkout: any) =>{
            return {
                title: singleWorkout.name,
                href: '#',
                icon: MdDirectionsBike,
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

    if(loading){
        return <div>loading</div>
    }else{
        return (
            // only return this if isLoading is false
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 md:ml-10 md:mr-10">
                {actions.map((action, actionIdx) => (
                    <div
                        key={action.title}
                        className={classNames(
                            actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                            actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                            actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                            'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                        )}
                    >
                        <div>
            <span
                className={classNames(
                    action.iconBackground,
                    action.iconForeground,
                    'inline-flex rounded-lg p-3 ring-4 ring-white'
                )}
            >

              <action.icon className="h-6 w-6" aria-hidden="true" />

            </span>
                        </div>
                        <div className="mt-8">
                            <Map polyString={action.map_polyline} width={"500"} height={"500"}/>
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                <a href={action.href} className="focus:outline-none">
                                    {/* Extend touch target to entire panel */}
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {action.title}
                                </a>
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                {`Distanz: ${Math.floor(parseInt(action.distance)/1000)} km`}
                            </p>
                        </div>
                        <span
                            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                        >

            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
                    </div>
                ))}
            </div>
        )
    }

}
export default Workout