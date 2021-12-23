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
import { MessageView } from '../views/messages.js';
export class CustomersController {
    constructor() {
        this.customers = new Customers();
        this.customersView = new CustomersView('#customers-view');
        this.messageView = new MessageView('#message-view');
        this.updateView('');
    }
    importData(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let customersList = yield request(urlList.customers, token);
            if (customersList.data) {
                this.messageView.alertClass = 'alert alert-success';
                this.customers.add(customersList.data);
                this.updateView('');
            }
            else {
                this.messageView.alertClass = 'alert alert-warning';
                throw Error('Não foi possível obter a lista de clientes.');
            }
        });
    }
    updateView(message) {
        this.customersView.update(this.customers);
        if (message) {
            this.messageView.update(message);
        }
    }
}
//# sourceMappingURL=customers.js.map