import { Input, Output } from "../circuit"
import { CircuitBehavior } from "../circuitbehavior"

export class GenericCircuitBehavior implements CircuitBehavior {
    update(inputs: Input[], outputs: Output[]): void {
        inputs.forEach((input, index) => {
            // this._inputMirrors[index].setValue(input.getValue())
        })
    }
}