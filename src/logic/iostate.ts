
export abstract class IOState {
    disconnect(arg0: IOState) {
        throw new Error('Method not implemented.')
    }
    
    constructor(
        private _name: string,
        private _value: boolean = false,
    ) { }

    abstract connect(io: IOState): void;

    public setValue(value: boolean) {
        this._value = value
    }

    public getValue() {
        return this._value
    }

    public getName() {
        return this._name
    }

    public setName(name: string) {
        this._name = name
    }
}