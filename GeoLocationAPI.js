

class GeoLocationAPI {

    async getGeoLocation() {
        try {
            const ipAddress = await this.getPublicIPAddress();
            const url = `http://ip-api.com/json/${ipAddress}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to get data. ${response.statusText}`);
            }

            let data = await response.json();

            let country = data.country;
            let region = data.regionName;
            let lat = data.lat;
            let lon = data.lon;


            return {
                country: data.country,
                region: data.regionName,
                lat: data.lat,
                lon: data.lon
            };

        } catch (error) {
            throw new Error(`Failed to get data. ${error.message}`);
        }
    }

    async getPublicIPAddress() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');

            if (!response.ok) {
                throw new Error(`Failed to get data. ${response.statusText}`);
            }

            let data = await response.json();

            return data.ip;
        } catch (error) {
            throw new Error(`Failed to get data. ${error.message}`);
        }
    }
}

module.exports = GeoLocationAPI;
