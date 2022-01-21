var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ThingsBoardConnection {
    constructor() {
        this._token = '';
        this._refreshToken = '';
        this._urlList = {
            login: function () { return `http://187.111.29.214:48080/api/auth/login`; },
            customers: function () { return `http://187.111.29.214:48080/api/customers?pageSize=100&page=0`; },
            devices: function () { return `http://187.111.29.214:48080/api/user/devices?pageSize=100&page=0`; },
            customerUsers: function () { return `http://187.111.29.214:48080/api/customer/users?pageSize=50&page=0`; },
            relations: function (device) {
                return `http://187.111.29.214:48080/api/relations?toId=${device.id.id}&toType=DEVICE&relationType=Usa`;
            },
            users: function (id) {
                return `http://187.111.29.214:48080/api/user/${id}`;
            }
        };
    }
    request(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Authorization': 'Bearer ' + this._token
                    }
                });
                let json = yield response.json();
                return json;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlToFetch = this._urlList.login();
            let response = yield fetchWithTimeout(urlToFetch, {
                timeout: 6000,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });
            if (response.status >= 400 && response.status < 600) {
                throw new Error('Não foi possível realizar o login no ThingsBoard.');
            }
            let json = yield response.json();
            this._token = json.token;
            this._refreshToken = json.refreshToken;
        });
    }
    get token() {
        return this._token;
    }
    get refreshToken() {
        return this._refreshToken;
    }
    get customersList() {
        return this.request(this._urlList.customers());
    }
    get devicesList() {
        return this.request(this._urlList.devices());
    }
    get usersList() {
        return this.request(this._urlList.customerUsers());
    }
    getRelations(device) {
        return this.request(this._urlList.relations(device));
    }
}
function fetchWithTimeout(resource, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { timeout = 8000 } = options;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = yield fetch(resource, Object.assign(Object.assign({}, options), { signal: controller.signal }));
        clearTimeout(id);
        return response;
    });
}
//# sourceMappingURL=thingsboard-connection.js.map