import { Device } from "./device.js";
export class Devices {
    constructor() {
        this.devices = [];
    }
    add(deviceList) {
        this.devices = [];
        deviceList.forEach(device => {
            const newDevice = new Device(device.id, device.label);
            newDevice.name = device.name || 'Sem nome';
            this.devices.push(newDevice);
        });
    }
    list() {
        return this.devices;
    }
}
//# sourceMappingURL=devices.js.map