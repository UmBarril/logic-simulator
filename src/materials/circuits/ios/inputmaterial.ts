import P5 from "p5";
import { InputState } from "../../../logic/inputstate";
import { ConnectionManager } from "../connectionmgr";
import { IOMaterial } from "./iomaterial";
import { PointType } from "../connectionpoint";

export class InputMaterial extends IOMaterial {

    constructor(
        p: P5,
        pos: P5.Vector, 
        state: InputState,
        connectionManager: ConnectionManager,
    ) {
        super(p, pos, state, connectionManager, PointType.INPUT)
    }

}