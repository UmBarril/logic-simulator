import { Circuit } from "./circuit";
import { IOState } from "./iostate";
import { OutputState } from "./outputstate";

export class InputState extends IOState {

    private _connectedOutput: OutputState | null = null

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

    override connect(io: IOState): void {
        if (io instanceof OutputState) {
            this._connectedOutput = io
        } else {
            throw new Error("Method not implemented.");
        }
    }
}