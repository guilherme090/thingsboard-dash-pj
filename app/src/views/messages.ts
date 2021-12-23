import { View } from "./view.js";

export class MessageView extends View<string> {
    private _alertClass = 'alert alert-info';

    constructor(selector: string){
        super(selector);
    }

    public set alertClass(_alertClass: string){
        this._alertClass = _alertClass;
    }

    protected template(model: string): string{
        return `
            <p class="${this._alertClass}">${model}</p>
        `;
    }
}