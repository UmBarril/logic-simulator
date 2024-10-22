import P5 from "p5"
import { ConnectionManager } from "../connectionmgr"
import { Modifiers } from "../../modifiers"
import { Circle } from "../../shapes/circle"
import { CircuitIOMaterial } from "./circuitiomaterial"
import { InputConnectionPoint } from "../inputconnectionpoint"
import { Circuit } from "../../../logic/circuit"

export class CircuitInputMaterial extends CircuitIOMaterial implements InputConnectionPoint {

    discriminator: "INPUT" = "INPUT"

    constructor(
        name: string,
        connectionManager: ConnectionManager,
        position: P5.Vector,
        radius: number, //tamanho do circulo
        circuit: Circuit,
        modifier: Modifiers<Circle> = new Modifiers<Circle>(),
    ) {
        super(name, connectionManager, position, circuit, radius, modifier)
    }
 
    updateValue(value: boolean): void {
       this.getCircuit().setInputValue(this.getName(), value) 
    }

    getValue(): boolean {
       return this.getCircuit().getInputValue(this.getName()) 
    }

}