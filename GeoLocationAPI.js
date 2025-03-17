const axios = require('axios');

class GeoLocationAPI {
    constructor() {
        this.httpClient = axios;
    }

    async getGeoLocation() {
        try {
            const ipAddress = await this.getPublicIPAddress();
            const url = `http://ip-api.com/json/${ipAddress}`;

            const response = await this.httpClient.get(url);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get data. ${error.message}`);
        }
    }

    async getPublicIPAddress() {
        try {
            const response = await this.httpClient.get('https://api.ipify.org');
            return response.data.trim();
        } catch (error) {
            throw new Error("Unable to retrieve public IP address.");
        }
    }
}

module.exports = GeoLocationAPI;
