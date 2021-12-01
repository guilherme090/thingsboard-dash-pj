import { urlList, request } from '../api.js'; 

export let userList = [];

export async function loadUsers (token){
    let customerUsersList = await request(urlList.customerUsers, token);
   
    userList = [];

    customerUsersList.data.forEach(element => {
        userList.push({
            id: element.id.id,
            name: `${element.firstName || ''} ${element.lastName || ''}` 
        });
    });
}