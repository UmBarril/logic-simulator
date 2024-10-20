import P5 from "p5"
import { InputState } from "../../../logic/inputstate"
import { ConnectionManager } from "../connectionmgr"
import { ConnectionPoint, PointType } from "../connectionpoint"
import { Modifiers } from "../../modifiers"
import { Circle } from "../../shapes/circle"
import { CircuitIOMaterial } from "./circuitiomaterial"
import { InputConnectionPoint } from "../inputconnectionpoint"
import { Circuit } from "../../../logic/circuit"

export class CircuitInputMaterial extends CircuitIOMaterial implements InputConnectionPoint {

    private _parentCircuit: Circuit

    constructor(
        name: string,
        connectionManager: ConnectionManager,
        position: P5.Vector,
        radius: number, //tamanho do circulo
        parentCircuit?: Circuit,
        modifier: Modifiers<Circle> = new Modifiers<Circle>(),
    ) {
        super(name, connectionManager, position, PointType.INPUT, radius, modifier)
        if (parentCircuit == undefined) {
            this._parentCircuit = connectionManager.getCircuit()
        } else {
            this._parentCircuit = parentCircuit
        }
    }

    getParentCircuit(): Circuit {
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