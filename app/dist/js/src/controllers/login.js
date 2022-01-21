var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Customers } from "../models/customers.js";
import { ThingsBoardConnection } from "../models/thingsboard-connection.js";
import { CustomersView } from "../views/customers.js";
import { MessageView } from "../views/messages.js";
import { urlList, request } from '../../api.js';
export class LoginController {
    constructor() {
        this.connection = new ThingsBoardConnection();
        this.messageView = new MessageView('#message-view');
        this.emailInput = document.querySelector('#auth-email');
        this.passwordInput = document.querySelector('#auth-password');
        this.customers = new Customers();
        this.customersView = new CustomersView('#customers-view');
        this.messageView.alertClass = 'alert alert-info';
        this.updateView('Faça o login no ThingsBoard.');
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection.login(this.emailInput.value, this.passwordInput.value);
            }
            catch (error) {
                console.error(error);
                this.messageView.alertClass = 'alert alert-warning';
                this.updateView('Não foi possível conectar-se ao ThingsBoard.');
                return;
            }
            this.messageView.alertClass = 'alert alert-success';
            this.updateView('Conectado ao ThingsBoard.');
        });
    }
    importCustomers(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let customersList = yield request(urlList.customers, token);
            console.log(customersList);
            if (customersList.data) {
                this.messageView.alertClass = 'alert alert-success';
                this.customers.add(customersList.data);
                this.updateView('');
            }
            else {
                this.messageView.alertClass = 'alert alert-warning';
                this.updateView('Não foi possível obter a lista de clientes.');
                throw Error('Não foi possível obter a lista de clientes.');
            }
        });
    }
    getToken() {
        return this.connection.token;
    }
    getRefreshToken() {
        return this.connection.refreshToken;
    }
    updateView(message) {
        if (message) {
            this.messageView.update(message);
        }
        this.customersView.update(this.customers);
    }
}
//# sourceMappingURL=login.js.map