export class Devices {
    constructor() {
        this.devices = [];
    }
    add(deviceList) {
        this.devices = [];
        deviceList.forEach(customer => {
            this.devices.push(customer);
        });
    }
    list() {
        return this.devices;
    }
}
//# sourceMappingURL=devices.js.map