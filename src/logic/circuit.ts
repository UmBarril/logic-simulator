import { Input, IOInterface, Output } from "./io";

/**
 * Um Circuit é uma coleção de portas lógicas (que são outros circuitos) e conexões.
 * Ele pode estar salvo para ser usado em outros circuitos maiores,
 * mas também pode estar sendo projetado atualmente.
 * @todo Implementar
 */
export abstract class Circuit {
    private name: string;
    protected inputs: Map<string, Input> = new Map();
    protected outputs: Map<string, Output> = new Map();

    constructor(name: string) {
        this.name = name;
    }

    public connectOuter(from: string, to: string, circuit: Circuit): void {
        this.outputs.get(from)!.connectToOuter(circuit.inputs.get(to)!);
    }

    public disconnectOuter(ioName: string): void {
        // TODO: encontrar por nome pode dar vários resultados iguais, resolver isso
        const io = this.outputs.get(ioName);
        if (!io) return;
        io.disconnect();
    }

    public setInputValue(name: string, value: boolean): void {
        this.inputs.get(name)!.updateValue(value);
    }

    /**
     * Util quando o circuito está sendo editado
     * @param name 
     * @param value 
     */
    public getInputValue(name: string): boolean {
        return this.inputs.get(name)!.getValue();
    }

    public getOutputValue(name: string): boolean {
        return this.outputs.get(name)!.getValue();
    }

    public getAllInputValues(): Map<string, boolean> {
        const result: Map<string, boolean> = new Map();
        for (const [name, input] of this.inputs) {
            result.set(name, input.getValue());
        }
        return result;
    }

    public getAllOutputValues(): Map<string, boolean> {
        const result: Map<string, boolean> = new Map();
        for (const [name, output] of this.outputs) {
            result.set(name, output.getValue());
        }
        return result;
    }

    public addInputObserver(name: string, observer: (value: boolean) => void): void {
        this.inputs.get(name)!.addObserver(observer);
    }

    public addOutputObserver(name: string, observer: (value: boolean) => void): void {
        this.outputs.get(name)!.addObserver(observer);
    }

    public checkInputExists(name: string): boolean {
        return this.inputs.get(name) !== undefined;
    }

    public checkOutputExists(name: string): boolean {
        return this.outputs.get(name) !== undefined;
    }

    public getName(): string {
        return this.name;
    }

    protected setName(name: string): void {
        this.name = name;
    }

    // TODO: remover esses BANGS ! e tratar os casos de erro
    protected connectInner(from: string, to: string, circuit: Circuit): void {
        let io: IOInterface | undefined = circuit.inputs.get(to);
        if (io === undefined) {
            io = circuit.outputs.get(to);
        }
        this.inputs.get(from)!.connectToInner(io!);
    }

    protected addInput(name: string): void {
        this.inputs.set(name, new Input(this));
    }

    protected addOutput(name: string): void {
        this.outputs.set(name, new Output(this));
    }

    public toString(): string {
        return `${this.name}(${Array.from(this.inputs.keys()).join(", ")})`;
    }
}


