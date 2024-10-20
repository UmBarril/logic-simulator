import P5 from "p5"
import { ConnectionManager } from "../connectionmgr"
import { ConnectionPoint, PointType } from "../connectionpoint"
import { Modifiers } from "../../modifiers"
import { Circle } from "../../shapes/circle"
import { CircuitIOMaterial } from "./circuitiomaterial"
import { OutputConnectionPoint } from "../outputconnectionpoint"

export class CircuitOutputMaterial extends CircuitIOMaterial implements OutputConnectionPoint {

    constructor(
        name: string,
        connectionManager: ConnectionManager,
        position: P5.Vector,
        radius: number = 30,
        modifier: Modifiers<Circle> = new Modifiers<Circle>()
    ) {
        super(name, connectionManager, position, PointType.OUTPUT, radius, modifier)
    }
 
    /**
     * Atualiza o valor e atualiza o input conectado a ele.
     * @param value 
     */
    override updateValue(value: boolean) {
        super.updateValue(value)
        this.getConnectedConnectionPoint()?.updateValue(value)
    }

    override connect(io: ConnectionPoint) {
        if (io.getPointType() == PointType.INPUT) {
            super.connect(io)
            this.getConnectedConnectionPoint()!.updateValue(this.getValue())
        } else {
            throw new Error("Method not implemented.");
        }
    }
}