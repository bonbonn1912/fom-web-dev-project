const getWorkoutArray = async () =>{
    const response = await fetch("/api/workout/base-summary");
    const data = await response.json();
    return data;
}

export {
    getWorkoutArray
}