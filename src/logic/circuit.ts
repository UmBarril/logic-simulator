import { GenericCircuitBehavior } from "./basic-circuits/generic"
import { CircuitBehavior } from "./circuitbehavior"
import { Input } from "./input"
import { Output } from "./output"

/**
 * Um Circuit é uma coleção de portas lógicas (que são outros circuitos) e conexões.
 * Ele pode estar salvo para ser usado em outros circuitos maiores,
 * mas também pode estar sendo projetado atualmente.
 * 
 * Quando um Circuit é exibido na área de trabalho, ele é chamado de LogicGate.
 * @todo Implementar
 */
export class Circuit {
    
    private _outputs: Output[] = []
    private _inputs: Input[] = []

    private _inputMirrors: Output[] = [] // espelham o valor dos inputs
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
        
    addOutput(output: Output) {
        this._outputs.push(output)
    }

    getOutput(index: number): Output {
        return this._outputs[index]
    }

    getOutputs(): Output[] {
        // todo: talvez fazer uma copia da lista antes de retornar
        return this._outputs
    }

    addInput(input: Input) {
        this._inputs.push(input)
        this._inputMirrors.push(new Output(input.getName()))
    }

    getInputs(): Input[] {
        // todo: talvez fazer uma copia da lista antes de retornar
        return this._inputs
    }

    getInput(index: number): Input {
        return this._inputs[index]
    }

}