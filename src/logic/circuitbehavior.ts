import { Input, Output } from "./circuit";

export interface CircuitBehavior {
    update(inputs: Input[], outputs: Output[]): void;
}