import P5 from "p5"
import { InputState } from "../../../logic/inputstate"
import { ConnectionManager } from "../connectionmgr"
import { PointType } from "../connectionpoint"
import { Modifiers } from "../../modifiers"
import { Circle } from "../../shapes/circle"
import { CircuitIOMaterial } from "./circuitiomaterial"

export class CircuitInputMaterial extends CircuitIOMaterial {

    constructor(
        state: InputState,
        connectionManager: ConnectionManager,
        position: P5.Vector,
        radius: number = 30,
        modifier: Modifiers<Circle> = new Modifiers<Circle>()
    ) {
        super(state, connectionManager, position, PointType.INPUT, radius, modifier)
    }
 
}