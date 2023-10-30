import pako from "pako";

const getDetailedWorkoutData = async (workoutId: number) =>{
    const response = await fetch(`/api/workout/detailed-summary?id=${workoutId}`);
    const data = await response.json();
    const metaRepsonse = await fetch(`/api/workout/metadata?id=${workoutId}`);
    const metadata = await metaRepsonse.json();
    const compressedBuffer = Uint8Array.from(atob(data[1]), c => c.charCodeAt(0));
    const decompressedBuffer = pako.inflate(compressedBuffer);
    const text = new TextDecoder().decode(decompressedBuffer);
    return {activity: JSON.parse(text), totalTime: data[0][0].elapsed_time, polyline: data[0][0].map_summary_polyline, name: metadata.name};
 }

 export {
        getDetailedWorkoutData
 }