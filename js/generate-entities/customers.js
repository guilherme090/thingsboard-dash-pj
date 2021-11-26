const customersUrl = 'http://187.111.29.214:48080/api/customers?pageSize=100&page=0';

const getCustomers = async function (token, customerChart) {

    let response = await fetch(customersUrl, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Authorization': 'Bearer ' + token
        }
    });

    let customerList = await response.json();
    let customerListArray = customerList.data;

    console.log(customerListArray);

    // // get logged customer id
    // let loggedCustomerId = null;
    // let foundparent = false;

    // for(let customer of customerListArray){
    //     loggedCustomerId = null;
    //     if(customer.ownerId){
    //         let parentId = customer.ownerId.id;
    //         foundparent = false;
    //         for(let possibleParentId of customerListArray){
    //             if(possibleParentId.id.id == parentId){
    //                 foundparent = true;
    //                 break;
    //             }
    //         }
    //         if(foundparent === false){
    //             loggedCustomerId = parentId;
    //         }
    //         console.log(loggedCustomerId);
    //     }
    // }

    while(customerChart.firstChild){
        customerChart.removeChild(customerChart.lastChild);
    }

    customerListArray.forEach((customer,index) => {
        let div = document.createElement('div');
        let txtNode = document.createTextNode(customerList.data[index].name);
        div.setAttribute('class', 'customer');
        div.appendChild(txtNode);
        customerChart.appendChild(div);
    });
};