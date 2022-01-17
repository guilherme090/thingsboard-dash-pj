export class ThingsBoardConnection {

    private _token: string = '';
    private _refreshToken: string = '';

    constructor(){}

    private _urlList = {
        login: function(){return`http://187.111.29.214:48080/api/auth/login`;},
        customers: function(){return`http://187.111.29.214:48080/api/customers?pageSize=100&page=0`;},
        devices: function(){return`http://187.111.29.214:48080/api/user/devices?pageSize=100&page=0`;},
        customerUsers: function(){return`http://187.111.29.214:48080/api/customer/users?pageSize=50&page=0`;},
        generateRelationsUrl: function(device: any) {
            return `http://187.111.29.214:48080/api/relations?toId=${device.id.id}&toType=DEVICE&relationType=Usa`;
        },
        generateUsersUrl: function(user: string) {
            return `http://187.111.29.214:48080/api/user/${user}`;
        }
    }

    public async request(url: string){
        try{
            let response = await fetch(url, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Authorization': 'Bearer ' + this._token
                }
            });
            let json = await response.json();
            return json;
        }catch(error){
            console.error(error);
        }
    }
    
    public async login(email: string, password: string){
        const urlToFetch = this._urlList.login();
        let response = await fetchWithTimeout(urlToFetch, {
            timeout: 6000,
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    username: email,
                    password: password
                }
            )
        });
    
        if(response.status >= 400 && response.status < 600){
            throw new Error('Não foi possível realizar o login no ThingsBoard.');
        }

        let json = await response.json();
        this._token = json.token;
        this._refreshToken = json.refreshToken;
    }  

    get token(): string {
        return this._token;
    }

    get refreshToken(): string {
        return this._refreshToken;
    } 
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






