const emailInput: HTMLInputElement = document.querySelector('#auth-email');
const passwordInput: HTMLInputElement = document.querySelector('#auth-password');
const loginForm: any = document.querySelector('#login-form');
const infoLabel: HTMLInputElement = document.querySelector('#info');

import { login, token, refreshToken } from './api.js'
import { getCustomers, customerChart } from './generate-entities/customers.js';
import { getDevices, deviceChart, createTable, tableArray } from './generate-entities/devices.js';

loginForm.onsubmit = async function (event: Event) {
    event.preventDefault(); //otherwise the form is going to clear itself before submitting
    infoLabel.innerHTML = 'Tentando conectar-se ao ThingsBoard...';
    try{    
        await login(emailInput, passwordInput, infoLabel);
        console.log('token: ' + token);
        console.log('refreshToken: ' + refreshToken);
    
        await getCustomers(token, customerChart);
        await getDevices(token);
        
        console.log('tableArray from outside function');
        console.log(tableArray);
        
        createTable();
        
    }catch(error){
        if(error.name === 'AbortError'){
            console.log('Não foi possível conectar-se à ThingsBoard API.');
        }
        console.error(error);
        infoLabel.innerHTML = 'A conexão com o ThingsBoard falhou. Tente novamente.';
    }   
}


// curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username":"tenant@thingsboard.org", "password":"tenant"}' 'http://187.111.29.214:48080/api/auth/login'

// http://187.111.29.214:48080/swagger-ui.html - acesso ao swagger

// http://187.111.29.214:48080/login 

// {"token":"$YOUR_JWT_TOKEN", "refreshToken":"$YOUR_JWT_REFRESH_TOKEN"}

// const exampleResponse = [
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "createdTime": 1616865917554,
//         "additionalInfo": {
//             "description": "",
//             "allowWhiteLabeling": true,
//             "homeDashboardId": null,
//             "homeDashboardHideToolbar": true
//         },
//         "country": null,
//         "state": null,
//         "city": null,
//         "address": null,
//         "address2": null,
//         "zip": null,
//         "phone": null,
//         "email": null,
//         "title": "Lifelink",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": null,
//         "name": "Lifelink",
//         "customerId": null,
//         "ownerId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "createdTime": 1616865935698,
//         "additionalInfo": {
//             "description": "",
//             "allowWhiteLabeling": true,
//             "homeDashboardId": null,
//             "homeDashboardHideToolbar": true
//         },
//         "country": null,
//         "state": null,
//         "city": null,
//         "address": null,
//         "address2": null,
//         "zip": null,
//         "phone": null,
//         "email": null,
//         "title": "Viva",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "Viva",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "87f0cc90-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "createdTime": 1616865974233,
//         "additionalInfo": {
//             "description": "",
//             "allowWhiteLabeling": true,
//             "homeDashboardId": null,
//             "homeDashboardHideToolbar": true
//         },
//         "country": null,
//         "state": null,
//         "city": null,
//         "address": null,
//         "address2": null,
//         "zip": null,
//         "phone": null,
//         "email": null,
//         "title": "Seu Madruga",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "Seu Madruga",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "d08a9d10-8fc0-11eb-9298-e9a30ed1b30c"
//         },
//         "createdTime": 1616934386017,
//         "additionalInfo": {
//             "description": "",
//             "allowWhiteLabeling": true,
//             "homeDashboardId": null,
//             "homeDashboardHideToolbar": true
//         },
//         "country": null,
//         "state": null,
//         "city": null,
//         "address": null,
//         "address2": null,
//         "zip": null,
//         "phone": null,
//         "email": null,
//         "title": "VLI",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "VLI",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "2a6d9c60-0a0a-11ec-bda8-59db816cec8b"
//         },
//         "createdTime": 1630379931942,
//         "additionalInfo": null,
//         "country": "Brasil",
//         "state": "MG",
//         "city": "Belo Horizonte",
//         "address": "Alfenas, 445/308 - Cruzeiro",
//         "address2": null,
//         "zip": "30310230",
//         "phone": "031999699789",
//         "email": "mariana@teste2.com",
//         "title": "5 - Mariana Teste 2",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "5 - Mariana Teste 2",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "4c0044e0-2d37-11ec-928e-05fb01234dc0"
//         },
//         "createdTime": 1634247606318,
//         "additionalInfo": null,
//         "country": "Brasil",
//         "state": "MG",
//         "city": "Belo Horizonte",
//         "address": "Alfenas, 445/308 - Cruzeiro",
//         "address2": null,
//         "zip": "30310230",
//         "phone": "03125555511",
//         "email": "mariana@teste.com",
//         "title": "6 - Mariana teste",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "6 - Mariana teste",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "00a81da0-a462-11eb-b214-e70513ea6beb"
//         },
//         "createdTime": 1619202638970,
//         "additionalInfo": {
//             "description": "",
//             "allowWhiteLabeling": true,
//             "homeDashboardId": null,
//             "homeDashboardHideToolbar": true
//         },
//         "country": null,
//         "state": null,
//         "city": null,
//         "address": null,
//         "address2": null,
//         "zip": null,
//         "phone": null,
//         "email": null,
//         "title": "Gigas",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "Gigas",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "00c2ac70-ebdd-11eb-930d-59db816cec8b"
//         },
//         "createdTime": 1627061999799,
//         "additionalInfo": null,
//         "country": "substring",
//         "state": null,
//         "city": "subsubstring",
//         "address": "subsubstring",
//         "address2": "subsubstring",
//         "zip": null,
//         "phone": null,
//         "email": "subsubstring@string.com.br",
//         "title": "subsubstring",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "subsubstring",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "66284520-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "32d6c120-0545-11ec-bda8-59db816cec8b"
//         },
//         "createdTime": 1629855530546,
//         "additionalInfo": null,
//         "country": "Brasil",
//         "state": "MG",
//         "city": "Belo Horizonte",
//         "address": "Rua Brás Cubas, 39/202 - Cruzeiro",
//         "address2": null,
//         "zip": "30310220",
//         "phone": "03125555511",
//         "email": "mariana.machado@risu.com.br",
//         "title": "Sr",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "70fddc30-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "Sr",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "70fddc30-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "70fddc30-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "d5bfd010-0546-11ec-bda8-59db816cec8b"
//         },
//         "createdTime": 1629856233361,
//         "additionalInfo": null,
//         "country": "Brasil",
//         "state": "MG",
//         "city": "Belo Horizonte",
//         "address": "Rua Brás Cubas, 39/202 - Cruzeiro",
//         "address2": null,
//         "zip": "30310220",
//         "phone": "03125555511",
//         "email": "mariana.machado@risu.com.br",
//         "title": "3 - Mariana Machado",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "3 - Mariana Machado",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     },
//     {
//         "id": {
//             "entityType": "CUSTOMER",
//             "id": "3dae41e0-0a04-11ec-bda8-59db816cec8b"
//         },
//         "createdTime": 1630377387262,
//         "additionalInfo": null,
//         "country": "Brasil",
//         "state": null,
//         "city": null,
//         "address": "null, null - null",
//         "address2": null,
//         "zip": null,
//         "phone": "0",
//         "email": "mari.mlo@hotmail.com",
//         "title": "4 - Teste Grupo",
//         "tenantId": {
//             "entityType": "TENANT",
//             "id": "e5554bf0-8f20-11eb-9298-e9a30ed1b30c"
//         },
//         "parentCustomerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "name": "4 - Teste Grupo",
//         "customerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         },
//         "ownerId": {
//             "entityType": "CUSTOMER",
//             "id": "70f8d320-8f21-11eb-9298-e9a30ed1b30c"
//         }
//     }
// ]