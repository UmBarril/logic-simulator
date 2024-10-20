import { Input, Output } from "../circuit";
import { CircuitBehavior } from "../circuitbehavior";

export class AndBehavior implements CircuitBehavior {

    update(inputs: Map<string, Input>, outputs: Map<string, Output>): void {
        let a = inputs.get("A")?.value
        let b = inputs.get("B")?.value
        this.setOutput(3, a && b)
    }

}