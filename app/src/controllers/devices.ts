
// import { urlList, request } from '../../api.js'; 
// import { Devices } from '../models/devices.js';
// import { DevicesView } from '../views/devices.js';
// import { MessageView } from '../views/messages.js';

// export class DevicesController {
    
//     private devices = new Devices();
//     private devicesView = new DevicesView('#customers-view');
//     private messageView = new MessageView('#message-view');

//     constructor(){
//         this.updateView('');
//     }

//     public async importData(token: string) {
//         let devicesList = await request(urlList.devices, token);
//         if(customersList.data) {
//             this.messageView.alertClass = 'alert alert-success';
//             this.devices.add(customersList.data);
//             this.updateView('');
//         } else {
//             this.messageView.alertClass = 'alert alert-warning';
//             throw Error('Não foi possível obter a lista de clientes.');
//         }
//     }

//     private updateView(message: string | null): void {
//         this.devicesView.update(this.devices);
//         if(message){
//             this.messageView.update(message);
//         }
//     }
// }