import { CircuitBehavior } from "../circuitbehavior"
import { Input } from "../input"
import { Output } from "../output"

export class GenericCircuitBehavior implements CircuitBehavior {
    update(inputs: Input[], outputs: Output[]): void {
        inputs.forEach((input, index) => {
            // this._inputMirrors[index].setValue(input.getValue())
        })
    }
}