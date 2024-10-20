import { InputState } from "./inputstate";
import { IOState } from "./iostate";

export class OutputState extends IOState {

    private _connectedInput: InputState | null = null

    constructor(name: string) {
        super(name)
    }

    /**
     * Atualiza o valor e atualiza o input conectado a ele.
     * @param value 
     */
    override set value(value: boolean) {
        super.value = value

        if (this._connectedInput != null) {
            this._connectedInput.value = value
        }
    }

    connect(input: InputState) {
        this._connectedInput = input
        this._connectedInput.value = this.value
    }
}