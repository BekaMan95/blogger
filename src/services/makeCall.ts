import { IMakeCall } from "./types";



export const makeCall = (params: IMakeCall) => {
    const { method, url, body, headers } = params;
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                const error = new Error('API call failed');
                (error as any).data = errorData;
                throw error;
            });
        }
        return response.json();
    }); 
}
