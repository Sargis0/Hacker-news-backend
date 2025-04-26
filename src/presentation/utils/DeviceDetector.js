import crypto from "crypto";

class DeviceDetector {
    static generateDeviceId(request) {
        const ip = request.ip || request.headers["x-forward-for"] || request.connection.remoteAddress;
        const userAgent = request.headers["user-agent"] || "";

        const rawData = `${ip}-${userAgent}`;
        return crypto.createHash("sha256").update(rawData).digest("hex");
    }
}

export default DeviceDetector;
