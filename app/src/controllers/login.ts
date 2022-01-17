import { ThingsBoardConnection } from "../models/thingsboard-connection.js";
import { MessageView } from "../views/messages.js";

export class LoginController {
    private connection = new ThingsBoardConnection();
    private messageView = new MessageView('#message-view');
    private emailInput = <HTMLInputElement> document.querySelector('#auth-email');
    private passwordInput = <HTMLInputElement> document.querySelector('#auth-password');

    constructor() {
        this.messageView.alertClass = 'alert alert-info';
        this.updateView('Faça o login no ThingsBoard.');
    }

    public async login() {
        try{
            await this.connection.login(this.emailInput.value, this.passwordInput.value);
        } catch(error) {
            console.error(error);
            this.messageView.alertClass = 'alert alert-warning';
            this.updateView('Não foi possível conectar-se ao ThingsBoard.');
            return;
        }
        this.messageView.alertClass = 'alert alert-success';
        this.updateView('Conectado ao ThingsBoard.');    
    }

    public getToken():string {
        return this.connection.token;
    }

    public getRefreshToken():string {
        return this.connection.refreshToken;
    }

    private updateView(message: string | null): void {
        if(message){
            this.messageView.update(message);
        }
    }
}