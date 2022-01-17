export class Device {
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }
    static createDevice(id, label) {
        const device = new Device(id, label);
        return device;
    }
}
//# sourceMappingURL=device.js.map