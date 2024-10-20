import { CircuitBehavior } from "../circuitbehavior"
import { InputState } from "../inputstate"
import { OutputState } from "../outputstate"

export class GenericCircuitBehavior implements CircuitBehavior {
    update(inputs: InputState[], outputs: OutputState[]): void {
        inputs.forEach((input, index) => {
            // this._inputMirrors[index].setValue(input.getValue())
        })
    }
}