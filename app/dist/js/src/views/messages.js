import { View } from "./view.js";
export class MessageView extends View {
    constructor(selector) {
        super(selector);
        this._alertClass = 'alert alert-info';
    }
    set alertClass(_alertClass) {
        this._alertClass = _alertClass;
    }
    template(model) {
        return `
            <p class="${this._alertClass}">${model}</p>
        `;
    }
}
//# sourceMappingURL=messages.js.map