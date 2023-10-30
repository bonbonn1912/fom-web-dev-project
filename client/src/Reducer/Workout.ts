const WorkoutReducer = (state: any, action: any) => {
    let power = 0;
    let speed = 0;
    let heartRate = 0;
    let cadence = 0;
    let altitude = 0;
    action.payload.activity.series.map((stream: any) => {
        if(stream.type === "watts"){ power = (stream.data)}
        if(stream.type === "velocity_smooth") {speed = (stream.data)}
        if(stream.type === "heartrate") {heartRate = (stream.data)}
        if(stream.type === "cadence") {cadence = (stream.data)};
        if(stream.type === "altitude") {altitude = (stream.data)}
    });
    switch (action.type) {
        case 'SET_WORKOUT_DATA':
            return { ...state, workoutTitle: action.payload.name, power: power, speed: speed, heartRate: heartRate, cadence: cadence, altitude: altitude, map_polyline: action.payload.polyline, timeAboveFtp: action.payload.activity.timeAboveFtp, timeBelowFtp: action.payload.totalTime - action.payload.activity.timeAboveFtp };

    }
}

const initialState = {
    workoutTitle: "",
    heartRate: [],
    speed: [],
    cadence: [],
    altitude: [],
    power: [],
    map_polyline: "",
    timeAboveFtp: 0,
    timeBelowFtp: 0,
}

export {
    WorkoutReducer,
    initialState
}