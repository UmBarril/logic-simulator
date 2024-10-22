import P5 from "p5"
import { ConnectionManager } from "../connectionmgr"
import { Modifiers } from "../../modifiers"
import { Circle } from "../../shapes/circle"
import { CircuitIOMaterial } from "./circuitiomaterial"
import { OutputConnectionPoint } from "../outputconnectionpoint"
import { Circuit } from "../../../logic/circuit"

export class CircuitOutputMaterial extends CircuitIOMaterial implements OutputConnectionPoint {

    discriminator: "OUTPUT" = "OUTPUT"

    constructor(
        name: string,
        connectionManager: ConnectionManager,
        position: P5.Vector,
        radius: number = 30,
        circuit: Circuit,
        color: number[] = [0, 0, 255], // TODOFAST
        modifier: Modifiers<Circle> = new Modifiers<Circle>()
    ) {
        super(name, connectionManager, position, circuit, radius, modifier)
    }

    updateValue(value: boolean): void {
        throw new Error("Method not implemented.");
    }

    getValue(): boolean {
       return this.getCircuit().getOutputValue(this.getName()) 
    }

}