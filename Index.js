const GeoLocationService = require('./GeoLocationAPI');
const SunLocation = require('./SunLocation');
const DayStatus = require('./DayStatus');

(async function main() {
    const geoLocationService = new GeoLocationService();

    try {
        const data = await geoLocationService.getGeoLocation();

        const geoData = {
            country: data.country,
            region: data.regionName,
            latitude: parseFloat(data.lat),
            longitude: parseFloat(data.lon),
            dateTimeNow: new Date()
        };

        const sunLocation = new SunLocation();
        const sunAzimuth = sunLocation.calculateSunPosition(geoData.dateTimeNow, geoData.latitude, geoData.longitude);

        const dayStatus = new DayStatus();
        const status = dayStatus.calculateDayStatus(sunAzimuth);

        console.log("Country".padEnd(15), "Latitude".padEnd(12), "Longitude".padEnd(12), "Day Status".padEnd(15));
        console.log("|------------|------------|------------|------------|");
        console.log(`| ${geoData.country.padEnd(10)} | ${geoData.latitude.toFixed(6).padEnd(10)} | ${geoData.longitude.toFixed(6).padEnd(10)} | ${status.padEnd(10)} |`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
