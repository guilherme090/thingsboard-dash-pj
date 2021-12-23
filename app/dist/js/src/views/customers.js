import { View } from "./view.js";
export class CustomersView extends View {
    template(model) {
        return `
            <table class="table table-hover-table-bordered">
                <thead>
                    <tr>
                        <th>CLIENTES</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.list().map(customer => {
            return `
                            <tr>
                                <td>${customer.name}
                            </tr>
                        `;
        }).join('')}
                </tbody>
            </table>
        `;
    }
}
//# sourceMappingURL=customers.js.map