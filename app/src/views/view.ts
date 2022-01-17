export abstract class View<T> {
    
    protected element: HTMLElement;
    protected abstract template(model: T): string;

    constructor(selector: string) {
        const element = document.querySelector(selector);
        if (element) {
            this.element = document.querySelector(selector) as HTMLElement;
        } else {
            throw Error (`Selector ${selector} does not exist.`);
        }
    }

    public update(model: T): void {
        let template = this.template(model);
        this.element.innerHTML = template;
    }
}