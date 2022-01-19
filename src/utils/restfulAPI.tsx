import Ajv from "ajv";
import { LOG } from "./constants";

// I know this defeats the purpose of ts (type any) but I cant figure out how to type it
export const SCHEMAS: any = {}; 

export async function sendAPIRequest(requestBody: JSON, serverUrl: string, requestType: string) {
    const response = await sendRequest(requestBody, serverUrl, requestType);

    if (!Object.keys(SCHEMAS).includes(requestType)) {
        throw new Error(`sendAPIRequest() does not have support for type: ${requestType}. Please add the schema to 'SCHEMAS'.`);
    }
    if (isJsonResponseValid(response, SCHEMAS[requestType])) {
        return response;
    }
    LOG.error(`Server ${requestType} response json is invalid. Check the Server.`);
    return null;
}

async function sendRequest(requestBody: JSON, serverUrl: string, requestType: string) {
    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(requestBody)
    };

    try {
        const response = await fetch(`${serverUrl}/api/${requestType}`, fetchOptions);
        if (response.ok) {
            return response.json();
        } else {
            LOG.error(`Request to server ${serverUrl} failed: ${response.status}: ${response.statusText}`);
        }

    } catch (err) {
        LOG.error(`Request to server failed : ${err}`);
    }

    return null;
}

export function getOriginalServerUrl() {
    const serverProtocol = location.protocol;
    const serverHost = location.hostname;
    const serverPort = location.port;
    const alternatePort = process.env.SERVER_PORT;
    return `${serverProtocol}\/\/${serverHost}:${(!alternatePort ? serverPort : alternatePort)}`;
}

export function isJsonResponseValid(object: JSON, schema: JSON) {
    if (object && schema) {
        const anotherJsonValidator = new Ajv();
        const validate = anotherJsonValidator.compile(schema);
        return validate(object);
    }
    LOG.error(`bad arguments - isJsonResponseValid(object: ${object}, schema: ${schema})`);
    return false;
}

