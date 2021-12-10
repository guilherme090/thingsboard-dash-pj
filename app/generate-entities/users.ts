import { urlList, request } from '../api.js'; 

export let userList: Array<Object> = [];

export async function loadUsers (token: string){
    let customerUsersList = await request(urlList.customerUsers, token);
   
    userList = [];

    customerUsersList.data.forEach(function(element: any) {
        userList.push({
            id: element.id.id,
            name: `${element.firstName || ''} ${element.lastName || ''}` 
        });
    });
}