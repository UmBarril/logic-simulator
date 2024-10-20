import { Circuit } from "../../logic/circuit";
import { ConnectionPoint } from "./connectionpoint";

export interface InputConnectionPoint extends ConnectionPoint{
    getParentCircuit(): Circuit;
}