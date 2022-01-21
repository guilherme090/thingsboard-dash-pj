var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loginForm = document.querySelector('#login-form');
const infoLabel = document.querySelector('#info');
import { LoginController } from './src/controllers/thingsboard.js';
const loginController = new LoginController();
loginForm.onsubmit = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        infoLabel.innerHTML = 'Tentando conectar-se ao ThingsBoard...';
        try {
            yield loginController.login();
            let token = loginController.getToken();
            let refreshToken = loginController.getRefreshToken();
            console.log('token: ' + token);
            console.log('refreshToken: ' + refreshToken);
            yield loginController.importCustomers();
            yield loginController.importUsers();
            yield loginController.importDevices();
            yield loginController.importRelations();
        }
        catch (error) {
            if (error.name === 'AbortError') {
                console.log('Não foi possível conectar-se à ThingsBoard API.');
            }
            console.error(error);
            infoLabel.innerHTML = 'A conexão com o ThingsBoard falhou. Tente novamente.';
        }
    });
};
//# sourceMappingURL=index.js.map