const getCoordinatesAsync = () =>{
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export {
    getCoordinatesAsync
}