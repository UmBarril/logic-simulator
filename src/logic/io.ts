import { Circuit } from "./circuit";

export abstract class IOInterface {
    private _value: boolean = false;
    public parentCircuit: Circuit;
    public connectedIo: IOInterface | null = null;
    private observers: ((value: boolean) => void)[] = [];

    constructor(circuit: Circuit) {
        this.parentCircuit = circuit;
    }

    public getValue(): boolean {
        return this._value;
    }

    public updateValue(value: boolean): void {
        this._value = value;
        this.observers.forEach(observer => observer(value));
        if (this.connectedIo) {
            this.connectedIo.updateValue(value);
        }
    }

    public disconnect(): void {
        this.connectedIo = null;
    }

    public addObserver(observer: (value: boolean) => void): void {
        this.observers.push(observer);
    }

    abstract connectToOuter(io: IOInterface): void
    abstract connectToInner(io: IOInterface): void
}

export class Output extends IOInterface {

    public connectToOuter(io: IOInterface): void {
        this.connectedIo = io;
    }

    public connectToInner(io: IOInterface): void { 
        throw new Error("Method not implemented.");
    }

}

export class Input extends IOInterface {

    public connectToOuter(io: IOInterface): void {
        throw new Error("Method not implemented.");
    }

    public connectToInner(io: IOInterface): void {
        this.connectedIo = io;
    }

}