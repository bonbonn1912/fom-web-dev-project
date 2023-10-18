import winston  from "winston";

class CustomLogger {
    private logger: winston.Logger;
    constructor(logPath: string) {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: `${logPath}/error.log`, level: 'error' }),
                new winston.transports.File({ filename: `${logPath}/combined.log` })
            ]
        });
    }

    log(level: string, tag: string, message: string | object) {
        const msg = (typeof message === 'object') ? JSON.stringify(message) : message;
        this.logger.log({
            level,
            message: `[${tag}] ${msg}`
        });
    }
}
export default CustomLogger;
