const fs = require('fs');
const path = require('path');

class DayStatus {
    calculateDayStatus(sunAzimuth) {
        const imageNames = this.getImageNames();

        if (sunAzimuth === 90) {
            return imageNames.find(file => file.toLowerCase().includes("sunrise")) || "";
        }

        if (sunAzimuth === 270) {
            return imageNames.find(file => file.toLowerCase().includes("sunset")) || "";
        }

        if (sunAzimuth >= 90 && sunAzimuth < 180) {
            return imageNames.find(file => file.toLowerCase().includes("morning")) || "";
        }

        if (sunAzimuth >= 180 && sunAzimuth < 270) {
            return imageNames.find(file => file.toLowerCase().includes("noon")) || "";
        }

        if (sunAzimuth >= 270 && sunAzimuth < 360) {
            return imageNames.find(file => file.toLowerCase().includes("evening")) || "";
        }

        return imageNames.find(file => file.toLowerCase().includes("night")) || "";
    }

    getImageNames() {
        const mainDirectory = path.join(__dirname, '..', 'maqsam');
        const imgDirectory = path.join(mainDirectory, 'img');

        if (fs.existsSync(imgDirectory)) {
            return fs.readdirSync(imgDirectory);
        } else {
            console.log(`The directory '${imgDirectory}' does not exist.`);
            return [];
        }
    }
}

module.exports = DayStatus;
