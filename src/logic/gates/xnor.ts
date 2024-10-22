import { Circuit } from "../circuit";

export class XnorGate extends Circuit {
    constructor() {
        super("and");
        this.addInput("a");
        this.addInput("b");
        this.addOutput("c");
    }

    override update(): void {
        let a = this.inputs.get("a")!.getValue()
        let b = this.inputs.get("b")!.getValue()
        this.outputs.get("c")!.updateValue(!((a || b) && !(a && b)));
    }
}