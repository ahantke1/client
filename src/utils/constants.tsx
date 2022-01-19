import anylogger from 'anylogger'
const log: any = anylogger("App");

export function setLogLevelIfDefault() {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    if (!urlParams.has("log")) {
        if (process.env.CLIENT_LOG_LEVEL === "INFO") {
            log.level = log.INFO;
        } else {
            log.level = log.ERROR;
        }
    }
}

setLogLevelIfDefault();

export const LOG = log("App");