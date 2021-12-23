export class View {
    constructor(selector) {
        const element = document.querySelector(selector);
        if (element) {
            this.element = document.querySelector(selector);
        }
        else {
            throw Error(`Selector ${selector} does not exist.`);
        }
    }
    update(model) {
        let template = this.template(model);
        this.element.innerHTML = template;
    }
}
//# sourceMappingURL=view.js.map