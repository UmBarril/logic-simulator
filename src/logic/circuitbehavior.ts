import { InputState } from "./inputstate";
import { OutputState } from "./outputstate";

export interface CircuitBehavior {
    update(inputs: InputState[], outputs: OutputState[]): void;
}