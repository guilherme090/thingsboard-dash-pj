const loginForm: HTMLElement = document.querySelector('#login-form');
const infoLabel: HTMLInputElement = document.querySelector('#info');

import { LoginController } from './src/controllers/thingsboard.js';

const loginController = new LoginController();

loginForm.onsubmit = async function (event: Event) {
    event.preventDefault(); //otherwise the form is going to clear itself before submitting
    infoLabel.innerHTML = 'Tentando conectar-se ao ThingsBoard...';
    try{   
        await loginController.login();

        let token = loginController.getToken();
        let refreshToken = loginController.getRefreshToken(); 

        console.log('token: ' + token);
        console.log('refreshToken: ' + refreshToken);
    
        await loginController.importCustomers();
        await loginController.importUsers();
        await loginController.importDevices();
        await loginController.importRelations();

        // await getDevices(token);
        
        // createTable();
        
    }catch(error){
        if(error.name === 'AbortError'){
            console.log('Não foi possível conectar-se à ThingsBoard API.');
        }
        console.error(error);
        infoLabel.innerHTML = 'A conexão com o ThingsBoard falhou. Tente novamente.';
    }   
}