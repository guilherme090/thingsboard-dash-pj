var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ThingsBoardConnection } from "../models/thingsboard-connection.js";
import { MessageView } from "../views/messages.js";
export class LoginController {
    constructor() {
        this.connection = new ThingsBoardConnection();
        this.messageView = new MessageView('#message-view');
        this.emailInput = document.querySelector('#auth-email');
        this.passwordInput = document.querySelector('#auth-password');
        this.updateView('Faça o login no ThingsBoard.');
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection.login(this.emailInput.value, this.passwordInput.value);
            }
            catch (error) {
                console.error(error);
                this.updateView('Não foi possível conectar-se ao ThingsBoard.');
                return;
            }
            this.updateView('Conectado ao ThingsBoard.');
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
    }
}
//# sourceMappingURL=login.js.map