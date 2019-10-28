export default class Api {
  constructor(route, url) {
    if (url == null) url = "";
    this.url = url + "/" + route;
    this.headers = { "Content-Type": "text/plain" };

    if (localStorage.hasOwnProperty("access_token")) {
      this.headers.Authorization = "Bearer " + localStorage.getItem("access_token");
    }
  }

  setHeaders(headers) {
    if (headers == null) return this.headers;
    this.headers = Object.assign(this.headers, headers);
  }

  async get(params) {
    if (params != null) this.url = this.url + "/" + params;
    return await this._request("GET");
  }

  async post(data) {
    if (data != null) this.data = JSON.stringify(data);
    return await this._request("POST");
  }

  async patch(data) {
    if (data != null) this.data = JSON.stringify(data);
    return await this._request("PATCH");
  }

  async put(data) {
    if (data != null) this.data = JSON.stringify(data);
    return await this._request("PUT");
  }

  async _request(method) {
    let is_success = false;

    const raw_response = await fetch(this.url, {
      method: method,
      credentials: "same-origin",
      body: this.data,
      headers: this.headers
    });

    if (raw_response.ok) is_success = true;

    const response = await raw_response.json();

    return {
      success: is_success,
      status_code: raw_response.status,
      contents: response
    };
  }
}
