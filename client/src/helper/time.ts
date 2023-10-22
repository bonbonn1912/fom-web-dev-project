import moment from 'moment';

const convertTimestamp = (inputTimestamp: string): string => {
    const momentObject = moment.utc(inputTimestamp);
    return momentObject.format('DD.MM.YYYY - HH:mm');
}

const convertTimestampsToChartLabels = (inputTimestamps: string[]): string[] => {
    const momentObjects = inputTimestamps.map((timestamp) => moment.utc(timestamp));
    return momentObjects.map((momentObject) => momentObject.format('DD.MM.YYYY'));
}

export {
    convertTimestamp,
    convertTimestampsToChartLabels
}
