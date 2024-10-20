import { Circuit, Input, Output } from "../circuit";

export class NotGate extends Circuit {
    
    constructor() {
        super("Not")
        this.addInput(new Input("A"))
        this.addOutput(new Output("Y"))
    }

    // public tick() {
    //     let a = this.getInput("A")
    //     this.setOutput("Y", !a)
    // }
}