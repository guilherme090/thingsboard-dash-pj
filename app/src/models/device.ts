export class Device {
    
    constructor(
        public readonly id: string,
        public readonly label: string
    ){}

    public static createDevice(id: string, label: string){
        const device = new Device(id, label);
        return device;
    }
}
