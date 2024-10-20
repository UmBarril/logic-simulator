import { GenericCircuitBehavior } from "./basic-circuits/generic"
import { CircuitBehavior } from "./circuitbehavior"
import { InputState } from "./inputstate"
import { OutputState } from "./outputstate"

/**
 * Um Circuit é uma coleção de portas lógicas (que são outros circuitos) e conexões.
 * Ele pode estar salvo para ser usado em outros circuitos maiores,
 * mas também pode estar sendo projetado atualmente.
 * 
 * Quando um Circuit é exibido na área de trabalho, ele é chamado de LogicGate.
 * @todo Implementar
 */
export class Circuit {
    
    private _outputs: OutputState[] = []
    private _inputs: InputState[] = []

    private _inputMirrors: OutputState[] = [] // espelham o valor dos inputs
    // private _internalCircuits: Circuit[] = [] // circuitos que estão dentro deste circuito

    private behavior: CircuitBehavior = new GenericCircuitBehavior()

    constructor(public name: string) { }

    /**
     * Atualiza o circuito.
     * @todo Implementar
     */
    update() {
        this.behavior.update(this._inputs, this._inputMirrors)
    }

    setBehavior(behavior: CircuitBehavior) {
        this.behavior = behavior
    }
        
    addOutput(output: OutputState) {
        this._outputs.push(output)
    }

    getOutput(index: number): OutputState {
        return this._outputs[index]
    }

    getOutputs(): OutputState[] {
        // todo: talvez fazer uma copia da lista antes de retornar
        return this._outputs
    }

    addInput(input: InputState) {
        this._inputs.push(input)
        this._inputMirrors.push(new OutputState(input.name))
    }

    getInputs(): InputState[] {
        // todo: talvez fazer uma copia da lista antes de retornar
        return this._inputs
    }

    getInput(index: number): InputState {
        return this._inputs[index]
    }
}