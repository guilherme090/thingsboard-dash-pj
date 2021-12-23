// import { urlList, request } from '../api.js'; 
import { Customers } from '../models/customers.js';
import { CustomersView } from '../views/customers.js';
import { urlList, request } from '../../api.js'; 

// export const customerChart: HTMLTableElement = document.querySelector('#customer-chart');

// export async function getCustomers(token: string, customerChart: HTMLTableElement) {
//     let customerList = await request(urlList.customers, token);
//     let customerListArray = customerList.data;

//     while(customerChart.firstChild){
//         customerChart.removeChild(customerChart.lastChild);
//     }

//     customerListArray.forEach(function(customer: any, index: number){
//         let div = document.createElement('div');
//         div.setAttribute('class','row');
//         let txtNode = document.createTextNode(customerList.data[index].name);
//         div.setAttribute('class', 'customer');
//         div.appendChild(txtNode);
//         customerChart.appendChild(div);
//     });
// };

export class CustomersController {
    
    private customers = new Customers();
    private customersView = new CustomersView('#customers-view');

    constructor(){
        this.updateView();
    }

    public async importData(token: string) {
        let customersList = await request(urlList.customers, token);
        if(customersList.data) {
            this.customers.add(customersList.data);
            this.updateView();
        } else {
            throw Error('Não foi possível obter a lista de clientes.');
        }
    }

    private updateView(): void {
        this.customersView.update(this.customers);
    }
}