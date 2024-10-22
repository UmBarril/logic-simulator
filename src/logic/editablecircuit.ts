import { Circuit } from "./circuit";

export class EditableCircuit extends Circuit {

    constructor() {
        super("Novo Circuito");
    }

    public setName(name: string): void {
        super.setName(name);
    }

    public connectInner(from: string, to: string, circuit: Circuit): void {
        super.connectInner(from, to, circuit);
    }

    public addInput(name: string): void {
        super.addInput(name);
    }

    public addOutput(name: string): void {
        super.addOutput(name);
    }

    override update(): void { /* não faz nada aqui */ } 
}