export class Device {
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }
    static createDevice(id, label) {
        const device = new Device(id, label);
        return device;
    }
    get userName() {
        return this._userName;
    }
    get userId() {
        return this._userId;
    }
    get assignedUser() {
        return this._assignedUser;
    }
    get name() {
        return this._name;
    }
    set userName(newUserName) {
        this._userName = newUserName;
    }
    set userId(newUserId) {
        this._userId = newUserId;
    }
    set name(newName) {
        this._name = newName;
    }
    set assignedUser(newUser) {
        this._assignedUser = newUser;
    }
}
//# sourceMappingURL=device.js.map