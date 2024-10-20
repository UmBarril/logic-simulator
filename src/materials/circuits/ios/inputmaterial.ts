import P5 from "p5";
import { ConnectionManager } from "../connectionmgr";
import { IOMaterial } from "./iomaterial";
import { ConnectionPoint, PointType } from "../connectionpoint";
import { Circuit } from "../../../logic/circuit";
import { InputConnectionPoint } from "../inputconnectionpoint";

export class InputMaterial extends IOMaterial implements InputConnectionPoint {

    private _parentCircuit: Circuit

    constructor(
        p: P5,
        pos: P5.Vector, 
        name: string,
        connectionManager: ConnectionManager,
        parentCircuit?: Circuit
    ) {
        super(p, name, pos, connectionManager, PointType.INPUT, true)
        if (parentCircuit == undefined) {
            this._parentCircuit = connectionManager.getCircuit()
        } else {
            this._parentCircuit = parentCircuit
        }
    }

    public getParentCircuit() {
        return this._parentCircuit
    }

    override updateValue(value: boolean): void {
        super.updateValue(value)
        this._parentCircuit.update()
    }

    override connect(io: ConnectionPoint): void {
        if (io.getPointType() == PointType.OUTPUT) {
            super.connect(io)
        } else {
            throw new Error("Method not implemented.");
        }
    }
}