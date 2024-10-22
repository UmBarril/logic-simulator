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
        this.notifyObservers();
        this.updateConnectedIo();
    }

    public disconnect(): void {
        this.connectedIo = null;
    }

    public addObserver(observer: (value: boolean) => void): void {
        this.observers.push(observer);
    }

    protected updateConnectedIo(): void {
        if (this.connectedIo != null) {
            this.connectedIo.updateValue(this._value);
        }
    }

    private notifyObservers(): void {
        this.observers.forEach(observer => observer(this._value));
    }

    abstract connectToOuter(io: IOInterface): void
    abstract connectToInner(io: IOInterface): void
}

export class Output extends IOInterface {

    public connectToOuter(io: IOInterface): void {
        this.connectedIo = io;
        this.updateConnectedIo()
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
        this.updateConnectedIo()
    }

}