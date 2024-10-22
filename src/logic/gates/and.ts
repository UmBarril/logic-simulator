import { Circuit } from "../circuit";

export class AndGate extends Circuit {
    constructor() {
        super("and");
        this.addInput("a");
        this.addInput("b");
        this.addOutput("c");
    }

    override update(): void {
        this.outputs.get("c")!.updateValue(this.inputs.get("a")!.getValue() && this.inputs.get("b")!.getValue());
    }
}