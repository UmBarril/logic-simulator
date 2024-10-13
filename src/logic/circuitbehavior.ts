import { Input } from "./input";
import { Output } from "./output";

export interface CircuitBehavior {
    update(inputs: Input[], outputs: Output[]): void;
}