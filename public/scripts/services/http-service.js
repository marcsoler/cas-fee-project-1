export default class HttpService {
    static ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        return fetch(url, {
            method,
            headers: fetchHeaders,
            body: JSON.stringify(data),
        }).then((x) => x.json());
    }
}
