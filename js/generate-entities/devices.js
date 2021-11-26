const devicesUrl = 'http://187.111.29.214:48080/api/user/devices?pageSize=100&page=0';
let userList = [];
let allRelationsList = [];
let deviceListArray = [];

const request = function(url){
    return fetch(url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Authorization': 'Bearer ' + token
        }
    });
}

const getUsers = async function (){
    const customerUsersUrl = `http://187.111.29.214:48080/api/customer/users?pageSize=50&page=0`;
    let customerUsersResponse = await request(customerUsersUrl);
    let customerUsersList = await customerUsersResponse.json();
   
    customerUsersList.data.forEach(element => {
        userList.push({
            id: element.id.id,
            name: `${element.firstName || ''} ${element.lastName || ''}` 
        });
        console.log(element);
    });
}

const getDevices = async function (token, deviceChart) {
    allRelationsList = [];
    await getUsers();
    console.log(`E-mail: ${emailInput.value}`);
    console.log(`Senha: ${passwordInput.value}`);

    let response = await request(devicesUrl);

    let deviceList = await response.json();
    deviceListArray = deviceList.data;

    console.log(deviceListArray);

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

    deviceListArray.forEach(async (device,index) => {
        // definition of row (contains device and assigned user)
        let tableRow = document.createElement('tr');

        // device column
        let deviceDiv = document.createElement('td');
        let deviceTxtNode = document.createTextNode(deviceList.data[index].name);
        deviceDiv.setAttribute('class', 'device');
        deviceDiv.appendChild(deviceTxtNode);

        // user column

        let relationsUrl = `http://187.111.29.214:48080/api/relations?toId=${deviceList.data[index].id.id}&toType=DEVICE&relationType=Usa`;
        let relationsResponse = await request(relationsUrl);
        let relationsList = await relationsResponse.json();

        // for each found relation, incorporate relation data to the allRelationsList. They will have to be removed afterwards
        relationsList.forEach(relation => {allRelationsList.push(relation)});

        console.log(relationsList);

        let relatedUserId = '';
        let userName = '';
        if(relationsList.length > 0){
            relatedUserId = relationsList[0].from.id;

            let userUrl = `http://187.111.29.214:48080/api/user/${relatedUserId}`
            let userResponse = await request(userUrl);
            let userItem = await userResponse.json();
            userName = userItem.firstName + " " + userItem.lastName;
            console.log(userItem.firstName + " " + userItem.lastName);
        }

        let userDiv = document.createElement('td');
        let userTxtNode = document.createTextNode(userName);
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
        newUserDiv.value = userName;

        tableRow.appendChild(deviceDiv);
        tableRow.appendChild(userDiv);
        tableRow.appendChild(newUserDiv);
        deviceChart.appendChild(tableRow);

        // console.log(newUserDiv.value)
        console.log(allRelationsList);
    });

    // TODO: Delete all relations. Set new ones.
    // transform everything into an object before drawing the table (including even the options box).
    // create a method for drawing the table.
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_select_selectedindex
};