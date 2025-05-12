const GeoLocationService = require('./GeoLocationAPI');
const SunLocation = require('./SunLocation');
const DayStatus = require('./DayStatus');

async function fetchLocationData() {
    const geoService = new GeoLocationService();
    return await geoService.getGeoLocation();
}

function printStatus({ country, lat, lon }, status) {
    console.table([{
        Country: country,
        Latitude: lat.toFixed(6),
        Longitude: lon.toFixed(6),
        'Day Status': status
    }]);
}

async function determineDayStatus() {
    try {
        const location = await fetchLocationData();
        const now = new Date();

        const sunPosition = new SunLocation().calculateSunPosition(now, location.lat, location.lon);
        const status = new DayStatus().calculateDayStatus(sunPosition);

        printStatus(location, status);
    } catch (error) {
        console.error("An error occurred while determining the day status:", error);
    }
}

determineDayStatus();
