class SunLocation {
    constructor() {
        this.Deg2Rad = Math.PI / 180.0;
        this.Rad2Deg = 180.0 / Math.PI;
    }

    calculateSunPosition(dateTime, latitude, longitude) {
        dateTime = new Date(dateTime.toISOString()); // Convert to UTC

        let julianDate = 367 * dateTime.getUTCFullYear() -
            Math.floor((7.0 / 4.0) * (dateTime.getUTCFullYear() +
                Math.floor((dateTime.getUTCMonth() + 10) / 12.0))) +
            Math.floor((275.0 * (dateTime.getUTCMonth() + 1)) / 9.0) +
            dateTime.getUTCDate() - 730531.5;

        let julianCenturies = julianDate / 36525.0;

        let siderealTimeHours = 6.6974 + 2400.0513 * julianCenturies;
        let siderealTimeUT = siderealTimeHours +
            (366.2422 / 365.2422) * (dateTime.getUTCHours() + dateTime.getUTCMinutes() / 60);
        let siderealTime = siderealTimeUT * 15 + longitude;

        julianDate += (dateTime.getUTCHours() + dateTime.getUTCMinutes() / 60) / 24.0;
        julianCenturies = julianDate / 36525.0;

        let meanLongitude = this.correctAngle(this.Deg2Rad * (280.466 + 36000.77 * julianCenturies));
        let meanAnomaly = this.correctAngle(this.Deg2Rad * (357.529 + 35999.05 * julianCenturies));

        let equationOfCenter = this.Deg2Rad * ((1.915 - 0.005 * julianCenturies) *
            Math.sin(meanAnomaly) + 0.02 * Math.sin(2 * meanAnomaly));

        let elipticalLongitude = this.correctAngle(meanLongitude + equationOfCenter);
        let obliquity = (23.439 - 0.013 * julianCenturies) * this.Deg2Rad;

        let rightAscension = Math.atan2(
            Math.cos(obliquity) * Math.sin(elipticalLongitude),
            Math.cos(elipticalLongitude)
        );

        let declination = Math.asin(Math.sin(rightAscension) * Math.sin(obliquity));
        let hourAngle = this.correctAngle(siderealTime * this.Deg2Rad) - rightAscension;

        if (hourAngle > Math.PI) {
            hourAngle -= 2 * Math.PI;
        }

        let altitude = Math.asin(Math.sin(latitude * this.Deg2Rad) *
            Math.sin(declination) + Math.cos(latitude * this.Deg2Rad) *
            Math.cos(declination) * Math.cos(hourAngle));

        let aziNom = -Math.sin(hourAngle);
        let aziDenom = Math.tan(declination) * Math.cos(latitude * this.Deg2Rad) -
            Math.sin(latitude * this.Deg2Rad) * Math.cos(hourAngle);

        let azimuth = Math.atan(aziNom / aziDenom);

        if (aziDenom < 0) {
            azimuth += Math.PI;
        } else if (aziNom < 0) {
            azimuth += 2 * Math.PI;
        }

        return azimuth * this.Rad2Deg;
    }

    correctAngle(angleInRadians) {
        if (angleInRadians < 0) {
            return 2 * Math.PI - (Math.abs(angleInRadians) % (2 * Math.PI));
        } else if (angleInRadians > 2 * Math.PI) {
            return angleInRadians % (2 * Math.PI);
        } else {
            return angleInRadians;
        }
    }
}

module.exports = SunLocation;
