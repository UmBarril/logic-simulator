import { Circuit } from "./circuit";
import { IOState } from "./iostate";

export class InputState extends IOState {

    constructor(
        name: string,
        private _parentCircuit?: Circuit
    ) { 
        super(name)
    }

    /**
     * Atualiza o valor e avisa o circuito pai.
     * @param value 
     */
    override setValue(value: boolean) {
        super.setValue(value)
        this._parentCircuit?.update()
    }

    public get parentCircuit() {
        return this._parentCircuit
    }

}