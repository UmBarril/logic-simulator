import P5 from "p5"
import { Material } from "./materials/interfaces/material";
import { ConnectionManager } from "./materials/circuits/connectionmgr";

export interface Workspace {
    getMaterials(p: P5, connectionManager: ConnectionManager): Material[]
}