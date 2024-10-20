
export abstract class IOState {
    
    constructor(
        private _name: string,
        private _value: boolean = false,
    ) { }

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