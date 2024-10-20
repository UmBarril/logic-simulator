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
    override setValue(value: boolean) {
        super.setValue(value)

        if (this._connectedInput != null) {
            this._connectedInput.setValue(value)
        }
    }

    override connect(io: IOState) {
        if (io instanceof InputState) {
            this._connectedInput = io
            this._connectedInput.setValue(this.getValue())
        } else {
            throw new Error("Method not implemented.");
        }
    }
}