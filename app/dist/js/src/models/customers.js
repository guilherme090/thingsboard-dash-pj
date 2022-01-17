export class Customers {
    constructor() {
        this.customers = [];
    }
    add(customerList) {
        this.customers = [];
        customerList.forEach(customer => {
            this.customers.push(customer);
        });
    }
    list() {
        return this.customers;
    }
}
//# sourceMappingURL=customers.js.map