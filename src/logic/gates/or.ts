import { Circuit } from "../circuit";

export class OrGate extends Circuit {
    constructor() {
        super("or");
        this.addInput("a");
        this.addInput("b");
        this.addOutput("c");
    }

    override update(): void {
        this.outputs.get("c")!.updateValue(this.inputs.get("a")!.getValue() || this.inputs.get("b")!.getValue());
    }
}