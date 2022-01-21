import { Device } from "./device.js";

export class Devices {
    private devices: Device[] = [];

    public add(deviceList: Device[]) {
        this.devices = [];
        deviceList.forEach(device => {
            const newDevice = new Device(device.id, device.label);
            newDevice.name = device.name || 'Sem nome';
            this.devices.push(newDevice);
        });
    }

    public list(): Device[]{
        return this.devices;
    }
}