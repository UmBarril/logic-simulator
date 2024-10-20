import { Circuit } from "../circuit";
import { InputState } from "../inputstate";
import { OutputState } from "../outputstate";

export class NotGate extends Circuit {
    
    constructor() {
        super("Not")
        this.addInput(new InputState("A", this))
        this.addOutput(new OutputState("Y"))
    }

    // public tick() {
    //     let a = this.getInput("A")
    //     this.setOutput("Y", !a)
    // }
}