import { useParams} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import LineChart from "./LineChart.tsx";
import Map from "./Map.tsx";
import Donut from "./DonutChart.tsx";
import RedModal from "../../components/RedMoal.tsx";
import {authenticate} from "../Auth/authContext.tsx";
import {useQuery} from "react-query";
import { getDetailedWorkoutData} from "../../Queries/Queries.ts";
import { WorkoutReducer, initialState} from "../../Reducer/Workout.tsx";


const ModalTile = "Delete Workout";
const ModalDesc = "Are you sure you want to delete this workout? This action cannot be undone.";
const ModalButtonText = "Delete";

const DetailedWorkout = () => {
    const [ isLoading, setIsLoading] = useState(true);
    const {id} = useParams<{id: string}>();
    const [modalOpen, setModalOpen] = useState(false);
    const [state, dispatch] = useReducer(WorkoutReducer, initialState);

    const setData = (data: any) =>{
        dispatch({type: 'SET_WORKOUT_DATA', payload: data});
        setIsLoading(false);
    }

    const { data, error, isLoading: isQueryLoading } = useQuery({
        queryKey: ['workout', id],
        // @ts-ignore
        queryFn: () => getDetailedWorkoutData(id),
        onSuccess:  setData,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    useEffect(() => {
        authenticate().then(() => {
        if(!isQueryLoading){
            setData(data);
        }
        });
    }, []);

    const deleteHandler = async (del: boolean) =>{
        if(del){
            const response = await fetch(`/api/workout/delete?workoutId=${id}`, {
                method: 'DELETE',
            })
            if(response.status === 200){
                setModalOpen(!modalOpen);
                window.location.href = "/dashboard/workouts";
            }

        }
        setModalOpen(!modalOpen);
    }
    if(error) return <div>error</div>
    if(isLoading) return (<LoadingSpinner callFrom={"detailedWorkout"} height={100}  width={100}/>)

    return (
        <>
            <div>
                <RedModal text={ModalTile} desc={ModalDesc} buttontext={ModalButtonText} isOpen={modalOpen} close={deleteHandler}/>
            </div>
            <div className="flex justify-between mt-2 mb-2 items-center">
                <div className="font-semibold">
                    {state.workoutTitle}
                </div>
                    <button
                        onClick={()=> deleteHandler(false)}
                        type="button"
                        className="rounded bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete
                    </button>
                </div>
                <div className="w-full h-[420px]">
                    <LineChart speed={state.speed} power={state.power} heartRate={state.heartRate} altitude={state.altitude} cadence={state.cadence}/>
                </div>
                <div className="w-full">
                    <Map polyString={state.map_polyline} width={"100%"} height={"300px"} controllables={true} zIndex={-1}/>
                </div>
                <div className="flex w-[300px] h-[300px]">
                    <Donut timeAboveFTP={state.timeAboveFtp} timeBelowFTP={state.timeBelowFtp}/>
                </div>
            </>
        )
}

export default DetailedWorkout