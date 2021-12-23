var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Customers } from '../models/customers.js';
import { CustomersView } from '../views/customers.js';
import { urlList, request } from '../../api.js';
export class CustomersController {
    constructor() {
        this.customers = new Customers();
        this.customersView = new CustomersView('#customers-view');
        this.updateView();
    }
    importData(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let customersList = yield request(urlList.customers, token);
            if (customersList.data) {
                this.customers.add(customersList.data);
                this.updateView();
            }
            else {
                throw Error('Não foi possível obter a lista de clientes.');
            }
        });
    }
    updateView() {
        this.customersView.update(this.customers);
    }
}
//# sourceMappingURL=customers.js.map