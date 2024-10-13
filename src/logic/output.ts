import { Input } from "./input";
import { IOState } from "./iostate";

export class Output extends IOState {

    private _connectedInput: Input | null = null

    constructor(name: string) {
        super(false, name)
    }

    /**
     * Atualiza o valor e atualiza o input conectado a ele.
     * @param value 
     */
    override setValue(value: boolean) {
        super.setValue(value)
        this._connectedInput?.setValue(value)
    }

    connect(input: Input) {
        this._connectedInput = input
    }
}