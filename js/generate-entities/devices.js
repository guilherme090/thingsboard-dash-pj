import { urlList, request } from '../api.js'; 
import { userList, loadUsers } from './users.js';

let allRelationsList = [];
let deviceListArray = [];
export let tableArray = [];

export const deviceChart = document.querySelector('#device-chart');

export async function getDevices (token) {
    tableArray = [];

    // Erase table to show it is loading...
    while(deviceChart.firstChild){
        deviceChart.removeChild(deviceChart.lastChild);
    }
    let caption = deviceChart.createCaption();
    caption.innerHTML = 'Carregando dispositivos...';

    await loadUsers(token);

    let deviceList = await request(urlList.devices, token);
    deviceListArray = deviceList.data;

    for(const [index, device] of deviceListArray.entries()){
        let relationsList = await request(urlList.generateRelationsUrl(device), token);

        // for each found relation, incorporate relation data to the allRelationsList. They will have to be removed afterwards
        relationsList.forEach(relation => {allRelationsList.push(relation)});
        let relatedUserId = '';
        let userName = '';
        let userId = '';
        if(relationsList.length > 0){
            relatedUserId = relationsList[0].from.id;
            let userItem = await request(urlList.generateUsersUrl(relatedUserId), token);
            userName = userItem.firstName + " " + userItem.lastName;
            userId = userItem.id.id;
        }      

        tableArray.push({
            deviceName: deviceList.data[index].name,
            deviceId: deviceList.data[index].id.id,
            userName: userName,
            userId: userId
        });
    };
    // TODO: Delete all relations. Set new ones.
    // transform everything into an object before drawing the table (including even the options box).
    // create a method for drawing the table.
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_select_selectedindex
    
};

export function createTable(){
    console.log('tableArray from within function');
    console.log(tableArray);
    while(deviceChart.firstChild){
        deviceChart.removeChild(deviceChart.lastChild);
    }

    // Create table titles (headers):

    let titleRow = document.createElement('tr');
    let titleDevice = document.createElement('td');
    titleDevice.appendChild(document.createTextNode('Dispositivo'));
    let titleCurrentUser = document.createElement('td');
    titleCurrentUser.appendChild(document.createTextNode('Usuário Atual'));
    let titleNewUser = document.createElement('td');
    titleNewUser.appendChild(document.createTextNode('Novo Usuário'));

    titleRow.appendChild(titleDevice);
    titleRow.appendChild(titleCurrentUser);
    titleRow.appendChild(titleNewUser);


    deviceChart.appendChild(titleRow);
    let caption = deviceChart.createCaption();
    caption.innerHTML = 'Dispositivos e Usuários';

    tableArray.forEach(tableItem => {
        // definition of row (contains device and assigned user)
        let tableRow = document.createElement('tr');

        // device column
        let deviceDiv = document.createElement('td');
        let deviceTxtNode = document.createTextNode(tableItem.deviceName);
        deviceDiv.setAttribute('class', 'device');
        deviceDiv.appendChild(deviceTxtNode);

        // user column
        let userDiv = document.createElement('td');
        let userTxtNode = document.createTextNode(tableItem.userName);
        userDiv.setAttribute('class', 'device');
        userDiv.appendChild(userTxtNode);

        // new user column
        // fill first position with empty space
        let newUserDiv = document.createElement('select');
        let optionDiv = document.createElement('option');
        optionDiv.innerHTML = '';
        newUserDiv.appendChild(optionDiv);

        // fill other positions with possible users
        userList.forEach( userElement => {
            let optionDiv = document.createElement('option');
            optionDiv.innerHTML = userElement.name;
            newUserDiv.appendChild(optionDiv);
        });
        newUserDiv.value = tableItem.userName;

        tableRow.appendChild(deviceDiv);
        tableRow.appendChild(userDiv);
        tableRow.appendChild(newUserDiv);
        deviceChart.appendChild(tableRow);
        });
}