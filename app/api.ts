export let urlList = {
    login: `http://187.111.29.214:48080/api/auth/login`,
    customers: `http://187.111.29.214:48080/api/customers?pageSize=100&page=0`,
    devices: `http://187.111.29.214:48080/api/user/devices?pageSize=100&page=0`,
    customerUsers: `http://187.111.29.214:48080/api/customer/users?pageSize=50&page=0`,
    generateRelationsUrl: function(device: any) {
        return `http://187.111.29.214:48080/api/relations?toId=${device.id.id}&toType=DEVICE&relationType=Usa`;
    },
    generateUsersUrl: function(user: string) {
        return `http://187.111.29.214:48080/api/user/${user}`;
    }
}

export async function request (url: string, token: string){
    try{
        let response = await fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Authorization': 'Bearer ' + token
            }
        });
        let json = await response.json();
        return json;
    }catch(error){
        console.error(error);
    }
}

export let token = '';
export let refreshToken = '';

export async function login (emailInput: HTMLInputElement, passwordInput: HTMLInputElement, infoLabel: Element){
        let response = await fetchWithTimeout(urlList.login, {
            timeout: 6000,
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    username: emailInput.value,
                    password: passwordInput.value
                }
            )
        });
    
        if(response.status >= 400 && response.status < 600){
            throw new Error('Não foi possível realizar o login no ThingsBoard.');
        }

        infoLabel.innerHTML = 'Conectado ao ThingsBoard.';

        let json = await response.json();
        token = json.token;
        refreshToken = json.refreshToken;
}

async function fetchWithTimeout(resource: any, options = {}){
    const { timeout = 8000 }: any = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });

    clearTimeout(id);

    return response;
}



