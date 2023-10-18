import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import LineChart from "./LineChart.tsx";
import Map from "./Map.tsx";

const DetailedWorkout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ heartRate, setHeartRate] = useState([]);
    const [ speed, setSpeed] = useState([]);
    const [ cadence, setCadence] = useState([]);
    const [ altitude, setAltitude] = useState([]);
    const [ power, setPower] = useState([]);
    const [ map_polyline, setMap_polyline] = useState("");
    const {id} = useParams<{id: string}>();

    const getWorkoutData = async () => {
        const response = await fetch(`/api/workout/detailed-summary?id=${id}`);
        const data = await response.json();
        const streams = data[1];
        setMap_polyline(data[0][0].map_summary_polyline);
        streams[0].series.map((stream: any) => {
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
        getWorkoutData();
    }, []);
    if(isLoading) {
        return (
           <LoadingSpinner height={100}  width={100}/>
        )
    }else{
        return (
            <>
                <div className="w-full h-[420px]">
                    <LineChart speed={speed} power={power} heartRate={heartRate} altitude={altitude} cadence={cadence}/>
                </div>
                <div className="w-full">
                    <Map polyString={map_polyline} width={"100%"} height={"300px"} controllables={true}/>
                </div>
            </>

        )
    }

}

export default DetailedWorkout