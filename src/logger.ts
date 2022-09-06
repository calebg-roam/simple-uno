let log_level : string = 'debug';

export const debug = (msg : any) => {
    if (log_level === 'debug') console.log(msg);
}

export const info = (msg : any) => {
    if (log_level === 'debug' || log_level === 'info') console.log(msg);
}

export const infoLogging = () => log_level = 'info';