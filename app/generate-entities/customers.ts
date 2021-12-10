import { urlList, request } from '../api.js'; 

export const customerChart: HTMLTableElement = document.querySelector('#customer-chart');

export async function getCustomers(token: string, customerChart: HTMLTableElement) {
    let customerList = await request(urlList.customers, token);
    let customerListArray = customerList.data;

    while(customerChart.firstChild){
        customerChart.removeChild(customerChart.lastChild);
    }

    customerListArray.forEach(function(customer: any, index: any){
        let div = document.createElement('div');
        let txtNode = document.createTextNode(customerList.data[index].name);
        div.setAttribute('class', 'customer');
        div.appendChild(txtNode);
        customerChart.appendChild(div);
    });
};