const sumValues = (values: any) => {
    if(values === undefined) return({totalTime: 0, totalCalories: 0, totalDistance: 0});
    let totalTime = 0;
    let totalCalories = 0;
    let totalDistance = 0;

    for (const value in values) {
        totalTime += parseInt(values[value].elapsed_time);
        totalCalories += parseInt(values[value].calories);
        totalDistance += parseInt(values[value].distance);
    }
    return { totalTime, totalCalories, totalDistance}

};

export {
    sumValues
};