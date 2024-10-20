import { Circuit, Input, Output } from "../circuit"

export class AndGate extends Circuit {
    
    constructor() {
        super("And")
        this.addInput(new Input("A"))
        this.addInput(new Input("B"))
        this.addOutput(new Output("X"))
    }

    // public tick() {
    //     let a = this.getInput("A")
    //     this.setOutput("Y", !a)
    // }
}