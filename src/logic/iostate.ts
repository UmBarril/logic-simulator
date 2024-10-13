
export class IOState {
    
    constructor(
        private _value: boolean,
        private _name: string
    ) { }

    setValue(value: boolean) {
        this._value = value
    }

    getValue() {
        return this._value
    }

    getName() {
        return this._name
    }

    setName(name: string) {
        this._name = name
    }
}