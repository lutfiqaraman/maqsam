const GeoLocationService = require('./GeoLocationAPI');
const SunLocation = require('./SunLocation');
const DayStatus = require('./DayStatus');

(async function main() {
    const geoLocationService = new GeoLocationService();

    try {
        const geoData = await geoLocationService.getGeoLocation();

        const { country, region, lat, lon } = geoData;
        const dateTimeNow = new Date();

        const sunLocation = new SunLocation();
        const sunAzimuth = sunLocation.calculateSunPosition(dateTimeNow, lat, lon);

        const dayStatus = new DayStatus();
        const status = dayStatus.calculateDayStatus(sunAzimuth);

        console.log("Country".padEnd(15), "Latitude".padEnd(12), "Longitude".padEnd(12), "Day Status".padEnd(15));
        console.log("|------------|------------|------------|------------|");
        console.log(`| ${geoData.country.padEnd(10)} | ${geoData.lat.toFixed(6).padEnd(10)} | ${geoData.lon.toFixed(6).padEnd(10)} | ${status.padEnd(10)} |`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
