
export abstract class IOState {
    
    constructor(
        private _name: string,
        private _value: boolean = false,
    ) { }

    public set value(value: boolean) {
        this._value = value
    }

    public get value() {
        return this._value
    }

    public get name() {
        return this._name
    }

    public set name(name: string) {
        this._name = name
    }
}