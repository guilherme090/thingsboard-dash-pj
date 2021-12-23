import { Customer } from "./customer.js";

export class Customers {
    private customers: Customer[] = [];

    public add(customerList: Customer[]) {
        this.customers = [];
        customerList.forEach(customer => {
            this.customers.push(customer);
        });
    }

    public list(): readonly Customer[]{
        return this.customers;
    }
}