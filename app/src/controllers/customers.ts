import { Customers } from '../models/customers.js';
import { CustomersView } from '../views/customers.js';
import { urlList, request } from '../../api.js'; 
import { MessageView } from '../views/messages.js';

export class CustomersController {
    
    private customers = new Customers();
    private customersView = new CustomersView('#customers-view');
    private messageView = new MessageView('#message-view');

    constructor(){
        this.updateView('');
    }

    public async importData(token: string) {
        let customersList = await request(urlList.customers, token);
        if(customersList.data) {
            this.messageView.alertClass = 'alert alert-success';
            this.customers.add(customersList.data);
            this.updateView('');
        } else {
            this.messageView.alertClass = 'alert alert-warning';
            throw Error('Não foi possível obter a lista de clientes.');
        }
    }

    private updateView(message: string | null): void {
        this.customersView.update(this.customers);
        if(message){
            this.messageView.update(message);
        }
    }
}