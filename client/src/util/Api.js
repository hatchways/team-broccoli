export default class Api {
    constructor(route, params, type, data) {
        this.type   = type;
        this.data   = JSON.stringify(data);
        this.url    = process.env.REACT_APP_SERVER_URL + '/' + route;
        if (params != null) this.url = this.url + '/' + params;
        this.headers = { 'Content-Type': 'text/plain' }

        if (localStorage.hasOwnProperty('access_token')) {
            this.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
        }
    }

    async get() { return await this._request('GET') }

    async post(data) {
        if (data != null) this.data = JSON.stringify(data);
        return await this._request('POST');
    }

    async patch() { return await this._request('PATCH') }

    async put() { return await this._request('PUT') }

    async _request(method) {
        let is_success = false;

        const raw_response = await fetch(this.url, {
            method: method,
            credentials: "same-origin",
            body: this.data,
            headers: this.headers
        });

        if (raw_response.ok) is_success = true

        const response = await raw_response.json();
        
        return {
            "success": is_success,
            "status_code": raw_response.status,
            "contents": response
        }

    }

}