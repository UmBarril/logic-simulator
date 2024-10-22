import { Circuit } from "../circuit";

export class XorGate extends Circuit {
    constructor() {
        super("xor");
        this.addInput("a");
        this.addInput("b");
        this.addOutput("c");
    }

    override update(): void {
        let a = this.inputs.get("a")!.getValue()
        let b = this.inputs.get("b")!.getValue()
        this.outputs.get("c")!.updateValue((a || b) && !(a && b));
    }
}