var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export let urlList = {
    login: `http://187.111.29.214:48080/api/auth/login`,
    customers: `http://187.111.29.214:48080/api/customers?pageSize=100&page=0`,
    devices: `http://187.111.29.214:48080/api/user/devices?pageSize=100&page=0`,
    customerUsers: `http://187.111.29.214:48080/api/customer/users?pageSize=50&page=0`,
    generateRelationsUrl: function (device) {
        return `http://187.111.29.214:48080/api/relations?toId=${device.id.id}&toType=DEVICE&relationType=Usa`;
    },
    generateUsersUrl: function (user) {
        return `http://187.111.29.214:48080/api/user/${user}`;
    }
};
export function request(url, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Authorization': 'Bearer ' + token
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
export let token = '';
export let refreshToken = '';
export function login(emailInput, passwordInput, infoLabel) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetchWithTimeout(urlList.login, {
            timeout: 6000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: emailInput.value,
                password: passwordInput.value
            })
        });
        if (response.status >= 400 && response.status < 600) {
            throw new Error('Não foi possível realizar o login no ThingsBoard.');
        }
        infoLabel.innerHTML = 'Conectado ao ThingsBoard.';
        let json = yield response.json();
        token = json.token;
        refreshToken = json.refreshToken;
    });
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
