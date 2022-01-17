import { Device } from "./device.js";

export class Devices {
    private devices: Device[] = [];

    public add(deviceList: Device[]) {
        this.devices = [];
        deviceList.forEach(customer => {
            this.devices.push(customer);
        });
    }

    public list(): readonly Device[]{
        return this.devices;
    }
}