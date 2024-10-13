import { Circuit } from "./circuit";
import { IOState } from "./iostate";

export class Input extends IOState {

    constructor(
        name: string,
        private _parentCircuit: Circuit
    ) { 
        super(false, name)
    }

    /**
     * Atualiza o valor e avisa o circuito pai.
     * @param value 
     */
    override setValue(value: boolean) {
        super.setValue(value)
        this._parentCircuit.update()
    }

    getParentCircuit() {
        return this._parentCircuit
    }

}