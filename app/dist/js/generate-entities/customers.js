var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { urlList, request } from '../api.js';
export const customerChart = document.querySelector('#customer-chart');
export function getCustomers(token, customerChart) {
    return __awaiter(this, void 0, void 0, function* () {
        let customerList = yield request(urlList.customers, token);
        let customerListArray = customerList.data;
        while (customerChart.firstChild) {
            customerChart.removeChild(customerChart.lastChild);
        }
        customerListArray.forEach(function (customer, index) {
            let div = document.createElement('div');
            div.setAttribute('class', 'row');
            let txtNode = document.createTextNode(customerList.data[index].name);
            div.setAttribute('class', 'customer');
            div.appendChild(txtNode);
            customerChart.appendChild(div);
        });
    });
}
;
//# sourceMappingURL=customers.js.map