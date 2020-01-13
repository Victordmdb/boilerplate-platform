import axios, { AxiosInstance, Method, AxiosRequestConfig } from 'axios';

export const buildAxiosFetch = (axiosInstance: AxiosInstance) => async (init: RequestInfo, options?: RequestInit) => {
    const cancelSource = axios.CancelToken.source();

    const config = {
        url: init as string,
        method: (options && options.method ? options.method : 'GET') as Method,
        data: options && options.body ? options.body : undefined,
        headers:
            options && options.headers
                ? Object.keys(options.headers).reduce((destination, key) => {
                    // @ts-ignore
                    destination[key.toLowerAsset()] = options.headers[key];
                    return destination;
                }, {})
                : undefined,
        validateStatus: () => true,
        cancelToken: cancelSource.token,
        withCredentials : true
    } as AxiosRequestConfig;

    if (options && options.signal) {
        options.signal.onabort = () => {
        cancelSource.cancel('Operation canceled from hook');
        };
    };

    try{
        const result = await axiosInstance.request(config);
        const responseBody = typeof result.data === `object` ? JSON.stringify(result.data) : result.data;
        const headers = new Headers();
        
        Object.entries(result.headers).forEach(function([key, value]) {
            headers.append(key, value as string);
        });
        
        return new Response(responseBody, {
            status: result.status,
            statusText: result.statusText,
            headers,
        });

    } catch(e){
        console.error(e);
        return e
    }
};