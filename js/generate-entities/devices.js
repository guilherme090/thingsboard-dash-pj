const devicesUrl = 'http://187.111.29.214:48080/api/user/devices?pageSize=100&page=0';
let userList = [];
let allRelationsList = [];
let deviceListArray = [];
let tableArray = [];

const request = function(url, token){
    return fetch(url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Authorization': 'Bearer ' + token
        }
    });
}

const getUsers = async function (token){
    const customerUsersUrl = `http://187.111.29.214:48080/api/customer/users?pageSize=50&page=0`;
    let customerUsersResponse = await request(customerUsersUrl, token);
    let customerUsersList = await customerUsersResponse.json();
   
    userList = [];

    customerUsersList.data.forEach(element => {
        userList.push({
            id: element.id.id,
            name: `${element.firstName || ''} ${element.lastName || ''}` 
        });
        console.log(element);
    });
}

const getDevices = async function (token, deviceChart) {
    await getUsers(token);
    console.log(`E-mail: ${emailInput.value}`);
    console.log(`Senha: ${passwordInput.value}`);

    let response = await request(devicesUrl, token);

    let deviceList = await response.json();
    deviceListArray = deviceList.data;

    deviceListArray.forEach(async (device,index) => {

        let relationsUrl = `http://187.111.29.214:48080/api/relations?toId=${device.id.id}&toType=DEVICE&relationType=Usa`;
        let relationsResponse = await request(relationsUrl, token);
        let relationsList = await relationsResponse.json();

        // for each found relation, incorporate relation data to the allRelationsList. They will have to be removed afterwards
        relationsList.forEach(relation => {allRelationsList.push(relation)});

        console.log(relationsList);

        let relatedUserId = '';
        let userName = '';
        let userId = '';
        if(relationsList.length > 0){
            relatedUserId = relationsList[0].from.id;

            let userUrl = `http://187.111.29.214:48080/api/user/${relatedUserId}`
            let userResponse = await request(userUrl, token);
            let userItem = await userResponse.json();
            userName = userItem.firstName + " " + userItem.lastName;
            userId = userItem.id.id;
            console.log(userItem.firstName + " " + userItem.lastName);
        }      

        tableArray.push({
            deviceName: deviceList.data[index].name,
            deviceId: deviceList.data[index].id.id,
            userName: userName,
            userId: userId
        });
        // console.log(newUserDiv.value)
        // console.log(allRelationsList);
    });

    // TODO: Delete all relations. Set new ones.
    // transform everything into an object before drawing the table (including even the options box).
    // create a method for drawing the table.
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_select_selectedindex

    createTable(deviceChart);
};

function createTable(deviceChart){
    console.log('tableArray');
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