const emailInput: HTMLInputElement = document.querySelector('#auth-email');
const passwordInput: HTMLInputElement = document.querySelector('#auth-password');
const loginForm: any = document.querySelector('#login-form');
const infoLabel: HTMLInputElement = document.querySelector('#info');

import { login, token, refreshToken } from './api.js'
import { getDevices, deviceChart, createTable, tableArray } from './generate-entities/devices.js';
import { CustomersController } from './src/controllers/customers.js';

const customersController = new CustomersController(); 

loginForm.onsubmit = async function (event: Event) {
    event.preventDefault(); //otherwise the form is going to clear itself before submitting
    infoLabel.innerHTML = 'Tentando conectar-se ao ThingsBoard...';
    try{    
        await login(emailInput, passwordInput, infoLabel);
        console.log('token: ' + token);
        console.log('refreshToken: ' + refreshToken);
    
        // await getCustomers(token, customerChart);
        await customersController.importData(token);

        await getDevices(token);
        
        createTable();
        
    }catch(error){
        if(error.name === 'AbortError'){
            console.log('Não foi possível conectar-se à ThingsBoard API.');
        }
        console.error(error);
        infoLabel.innerHTML = 'A conexão com o ThingsBoard falhou. Tente novamente.';
    }   
}