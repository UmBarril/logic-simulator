import { Circuit } from "./circuit";

export class AndGate extends Circuit {
    constructor() {
        super("and");
        this.addInput("a");
        this.addInput("b");
        this.addOutput("c");
    }

    // TODO: remover os BANGS ! e tratar os cados de erro
    public setInputValue(name: string, value: boolean): void {
        super.setInputValue(name, value);
        this.outputs.get("c")!.updateValue(this.inputs.get("a")!.getValue() && this.inputs.get("b")!.getValue());
    }
}