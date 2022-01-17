import { Customers } from "../models/customers.js";
import { View } from "./view.js";

export class CustomersView extends View<Customers> {
    protected template (model: Customers): string {
        return `
            <table class="table table-hover-table-bordered">
                <thead>
                    <tr>
                        <th>CLIENTES</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.list().map(customer => {
                        return `
                            <tr>
                                <td>${customer.name}
                            </tr>
                        `
                    }).join('')}
                </tbody>
            </table>
        `;
    }
}

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