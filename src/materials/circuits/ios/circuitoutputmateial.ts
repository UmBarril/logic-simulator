import P5 from "p5"
import { ConnectionManager } from "../connectionmgr"
import { PointType } from "../connectionpoint"
import { Modifiers } from "../../modifiers"
import { Circle } from "../../shapes/circle"
import { OutputState } from "../../../logic/outputstate"
import { CircuitIOMaterial } from "./circuitiomaterial"

export class CircuitOutputMaterial extends CircuitIOMaterial {

    constructor(
        state: OutputState,
        connectionManager: ConnectionManager,
        position: P5.Vector,
        radius: number = 30,
        modifier: Modifiers<Circle> = new Modifiers<Circle>()
    ) {
        super(state, connectionManager, position, PointType.OUTPUT, radius, modifier)
    }
 
}