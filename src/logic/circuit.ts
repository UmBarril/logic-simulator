import { ConnectionPoint } from "../materials/circuits/connectionpoint"
import { InputConnectionPoint } from "../materials/circuits/inputconnectionpoint"
import { OutputConnectionPoint } from "../materials/circuits/outputconnectionpoint"
import { GenericCircuitBehavior } from "./basic-circuits/generic"
import { CircuitBehavior } from "./circuitbehavior"

export class Output {
    constructor(public name: string) {}
}

export class Input {
    constructor(public name: string) {}
}

/**
 * Um Circuit é uma coleção de portas lógicas (que são outros circuitos) e conexões.
 * Ele pode estar salvo para ser usado em outros circuitos maiores,
 * mas também pode estar sendo projetado atualmente.
 * @todo Implementar
 */
export class Circuit {
    // id, nome
    private _outputs: Map<string, Output> = new Map()
    private _inputs: Map<string, Input> = new Map()

    private behavior: CircuitBehavior = new GenericCircuitBehavior()

    constructor(public name: string) { }

    /**
     * @param input 
     * @param output 
     */
    addConnection(input: InputConnectionPoint, output: OutputConnectionPoint) {
        
    }
    
    /**
     * Atualiza o circuito.
     * @todo Implementar
     */
    update() {
        this.behavior.update(Array.from(this._inputs.values()), Array.from(this._outputs.values()))
    }

    setBehavior(behavior: CircuitBehavior) {
        this.behavior = behavior
    }
        
    addOutput(output: Output): boolean {
        if (this._outputs.has(output.name)) {
            return false
        }
        this._outputs.set(output.name, output)
        return true
    }

    getOutput(name: string): Output | undefined {
        return this._outputs.get(name)
    }

    getOutputs(): Output[] {
        // todo: talvez fazer uma copia da lista antes de retornar
        return Array.from(this._outputs.values())
    }

    addInput(input: Input) {
        this._inputs.set(input.name, input)
        // this._inputMirrors.push(input.id, input)
    }

    getInputs(): Input[] {
        // todo: talvez fazer uma copia da lista antes de retornar
        return Array.from(this._inputs.values())
    }

    getInput(name: string): Input | undefined {
        return this._inputs.get(name)
    }
}