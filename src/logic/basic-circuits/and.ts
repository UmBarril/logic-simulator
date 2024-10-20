import { Circuit } from "../circuit"
import { InputState } from "../inputstate"
import { OutputState } from "../outputstate"

export class AndGate extends Circuit {
    
    constructor() {
        super("And")
        this.addInput(new InputState("A", this))
        this.addInput(new InputState("B", this))
        this.addOutput(new OutputState("X"))
    }

    // public tick() {
    //     let a = this.getInput("A")
    //     this.setOutput("Y", !a)
    // }
}