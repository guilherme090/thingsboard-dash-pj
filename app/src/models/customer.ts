export class Customer {

    constructor(
        public readonly name: string
    ){}

    public static createCustomer(name: string){
        return new Customer(name);
    }

}