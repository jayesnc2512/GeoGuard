import {v4 as uuid} from "uuid";

function generateLicenseId() {
    // Generate a v4 (random) UUID
    return uuid();
}

function generateMsgId() {
    function getRandomNumber(digits) {
        const min = 10 ** (digits - 1);
        const max = 10 ** digits - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate a 16-digit alert ID starting with "alert"
    const alertId = "alert" + getRandomNumber(12).toString().padStart(12, '0');
    return alertId
}

export { generateLicenseId,generateMsgId };