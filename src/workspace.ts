import P5 from "p5"
import { Material } from "./materials/interfaces/material";

export interface Workspace {
    getMaterials(p: P5): Material[]
}