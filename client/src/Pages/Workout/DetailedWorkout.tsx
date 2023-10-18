import { useParams} from "react-router-dom";

const DetailedWorkout = () => {
    const {id} = useParams<{id: string}>();
    return (
        <div>
            <h1>Workout ID: ${id}</h1>
        </div>
    )
}

export default DetailedWorkout