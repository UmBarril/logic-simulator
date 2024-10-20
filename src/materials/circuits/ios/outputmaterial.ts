import P5 from "p5";
import { ConnectionManager } from "../connectionmgr";
import { PointType } from "../connectionpoint";
import { IOMaterial } from "./iomaterial";
import { OutputState } from "../../../logic/outputstate";

export class OutputMaterial extends IOMaterial {

    constructor(
        p: P5,
        pos: P5.Vector, 
        state: OutputState,
        connectionManager: ConnectionManager,
    ) {
        super(p, pos, state, connectionManager, PointType.OUTPUT)
    }

}