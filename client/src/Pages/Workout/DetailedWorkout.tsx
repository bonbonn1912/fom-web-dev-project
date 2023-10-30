import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import LineChart from "./LineChart.tsx";
import Map from "./Map.tsx";
import Donut from "./DonutChart.tsx";
import RedModal from "../../components/RedMoal.tsx";
import {authenticate} from "../Auth/authContext.tsx";
import pako from "pako";


const ModalTile = "Delete Workout";
const ModalDesc = "Are you sure you want to delete this workout? This action cannot be undone.";
const ModalButtonText = "Delete";

const DetailedWorkout = () => {
    const [workoutTitle, setWorkoutTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [ heartRate, setHeartRate] = useState([]);
    const [ speed, setSpeed] = useState([]);
    const [ cadence, setCadence] = useState([]);
    const [ altitude, setAltitude] = useState([]);
    const [ power, setPower] = useState([]);
    const [ map_polyline, setMap_polyline] = useState("");
    const [ timeAboveFtp, setTimeAboveFtp] = useState(0);
    const [ timeBelowFtp, setTimeBelowFtp] = useState(0);
    const {id} = useParams<{id: string}>();
    const [modalOpen, setModalOpen] = useState(false);

    const getWorkoutData = async () => {
        const response = await fetch(`/api/workout/detailed-summary?id=${id}`);
        const metaRepsonse = await fetch(`/api/workout/metadata?id=${id}`);
        const metadata = await metaRepsonse.json();
        setWorkoutTitle(metadata.name)
        const data = await response.json();
        const compressedBuffer = Uint8Array.from(atob(data[1]), c => c.charCodeAt(0));
        const decompressedBuffer = pako.inflate(compressedBuffer);
        const text = new TextDecoder().decode(decompressedBuffer);
        const activity = JSON.parse(text);
        const totalTime = data[0][0].elapsed_time as number;
        setTimeAboveFtp(activity.timeAboveFtp as number);
        setTimeBelowFtp(totalTime - activity.timeAboveFtp as number)
        setMap_polyline(data[0][0].map_summary_polyline);
        activity.series.map((stream: any) => {
            if(stream.type === "watts"){
               setPower(stream.data);
            }
            if(stream.type === "velocity_smooth"){
                setSpeed(stream.data);
            }
            if(stream.type === "heartrate"){
                setHeartRate(stream.data);
            }
            if(stream.type === "cadence"){
                setCadence(stream.data);
            }
            if(stream.type === "altitude"){
                setAltitude(stream.data);
            }
        });

        setIsLoading(false);
    }

    useEffect(() => {
        authenticate().then(() => {
            getWorkoutData();
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
    if(isLoading) {
        return (
           <LoadingSpinner callFrom={"detailedWorkout"} height={100}  width={100}/>
        )
    }else{
        return (
            <>
                <div>
                    <RedModal text={ModalTile} desc={ModalDesc} buttontext={ModalButtonText} isOpen={modalOpen} close={deleteHandler}/>
                </div>

                <div className="flex justify-between mt-2 mb-2 items-center">
                    <div className="font-semibold">
                        {workoutTitle}
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
                    <LineChart speed={speed} power={power} heartRate={heartRate} altitude={altitude} cadence={cadence}/>
                </div>
                <div className="w-full">
                    <Map polyString={map_polyline} width={"100%"} height={"300px"} controllables={true} zIndex={-1}/>
                </div>
                <div className="flex w-[300px] h-[300px]">
                    <Donut timeAboveFTP={timeAboveFtp} timeBelowFTP={timeBelowFtp}/>
                </div>
            </>

        )
    }

}

export default DetailedWorkout