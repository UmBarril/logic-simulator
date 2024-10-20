import P5 from "p5";
import { ConnectionManager } from "../connectionmgr";
import { ConnectionPoint, PointType } from "../connectionpoint";
import { IOMaterial } from "./iomaterial";
import { OutputConnectionPoint } from "../outputconnectionpoint";

export class OutputMaterial extends IOMaterial implements OutputConnectionPoint {

    constructor(
        p: P5,
        pos: P5.Vector, 
        name: string,
        connectionManager: ConnectionManager,
    ) {
        const buttonClickDisabled = false
        super(p, name, pos, connectionManager, PointType.OUTPUT, buttonClickDisabled)
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