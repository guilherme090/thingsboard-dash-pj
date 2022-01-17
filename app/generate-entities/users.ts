import { urlList, request } from '../api.js'; 

export let userList: Array<object> = [];

export async function loadUsers (token: string){
    let customerUsersList = await request(urlList.customerUsers, token);
   
    userList = [];

    customerUsersList.data.forEach(function(element: {id: any, firstName: string, lastName: string}) {
        userList.push({
            id: element.id.id,
            name: `${element.firstName || ''} ${element.lastName || ''}` 
        });
    });
}