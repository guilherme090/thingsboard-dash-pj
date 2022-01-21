import { User } from "./user";

export class Device {
    private _userName: string;
    private _userId: string;
    private _name: string;
    private _assignedUser: User;

    constructor(
        public readonly id: any,
        public readonly label: string
    ){}

    public static createDevice(id: object, label: string){
        const device = new Device(id, label);
        return device;
    }

    get userName(){
        return this._userName;
    }

    get userId(){
        return this._userId;
    }

    get assignedUser(){
        return this._assignedUser;
    }

    get name(){
        return this._name;
    }

    set userName(newUserName: string){
        this._userName = newUserName;
    }
    
    set userId(newUserId: string){
        this._userId = newUserId;
    }

    set name(newName: string){
        this._name = newName;
    }

    set assignedUser(newUser: User){
        this._assignedUser = newUser;
    }
}
