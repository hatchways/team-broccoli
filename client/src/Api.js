export default class Api {
    constructor(route, params, type, data, url) {
        this.params = params;
        this.type   = type;
        this.data   = data;
        this.url    = process.env.REACT_APP_SERVER_URL + '/' + route;
        this.headers = { 'Content-Type': 'application/json' }
        if (localStorage.hasOwnProperty('access_token')) {
            this.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
        }
    }

    async get() { return await this._request('GET') }

    async post() { return await this._request('POST') }

    async patch() { return await this._request('PATCH') }

    async put() { return await this._request('PUT') }

    async _request(method) {
        return await fetch(this.url, {
            method: method,
            credentials: "same-origin",
            headers: this.headers
        })
        .then(res => {
            if (!res.ok) {
                console.log(res);
                return {
                    success: false,
                    status_code: res.status,
                    message: res.json()
                };
            }
            else {
                return {
                    success: true,
                    status_code: res.status,
                    message: res.json()
                }
            }
        })
        .catch(error =>{
            return {
                success: false,
                message: error
            }
        });
    }

}