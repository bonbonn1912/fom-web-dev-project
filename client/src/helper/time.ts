import moment from 'moment';

const convertTimestamp = (inputTimestamp: string): string => {
    const momentObject = moment.utc(inputTimestamp);
    return momentObject.format('DD.MM.YYYY - HH:mm');
}

export {
    convertTimestamp
}
