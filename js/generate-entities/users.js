var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { urlList, request } from '../api.js';
export let userList = [];
export function loadUsers(token) {
    return __awaiter(this, void 0, void 0, function* () {
        let customerUsersList = yield request(urlList.customerUsers, token);
        userList = [];
        customerUsersList.data.forEach(function (element) {
            userList.push({
                id: element.id.id,
                name: `${element.firstName || ''} ${element.lastName || ''}`
            });
        });
    });
}
