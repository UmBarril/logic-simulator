import { Circuit } from "../circuit";

export class NotGate extends Circuit {
    constructor() {
        super("not");
        this.addInput("a");
        this.addOutput("b");
        this.update(); // aqui é necessário para que ele comece com o valor correto
    }

    override update(): void {
        this.outputs.get("b")!.updateValue(!this.inputs.get("a")!.getValue());
    }
}