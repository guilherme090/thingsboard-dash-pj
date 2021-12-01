import { urlList, request } from '../api.js'; 

export const customerChart = document.querySelector('#customer-chart');

export async function getCustomers(token, customerChart) {
    let customerList = await request(urlList.customers, token);
    let customerListArray = customerList.data;

    while(customerChart.firstChild){
        customerChart.removeChild(customerChart.lastChild);
    }

    customerListArray.forEach((customer,index) => {
        let div = document.createElement('div');
        let txtNode = document.createTextNode(customerList.data[index].name);
        div.setAttribute('class', 'customer');
        div.appendChild(txtNode);
        customerChart.appendChild(div);
    });
};