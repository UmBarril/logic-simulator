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

    abstract update(): void

    public connectOuter(from: string, to: string, circuit: Circuit): void {
        let io: IOInterface  = this.getIOFromCircuit(to, circuit);
        this.outputs.get(from)!.connectToOuter(io);
    }

    public disconnectOuter(ioName: string): void {
        // TODO: encontrar por nome pode dar vários resultados iguais, resolver isso
        const io = this.outputs.get(ioName);
        if (!io) return;
        io.disconnect();
    }

    public setInputValue(name: string, value: boolean): void {
        this.inputs.get(name)!.updateValue(value);
        this.update();
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

    protected getIOFromCircuit(name: string, circuit: Circuit): IOInterface {
        let io: IOInterface | undefined = circuit.inputs.get(name);
        if (io === undefined) {
            io = circuit.outputs.get(name);
            if (io === undefined) {
                throw new Error(`IOInterface ${name} not found in circuit ${circuit.getName()}`);
            }
        }
        return io;
    }

    protected setName(name: string): void {
        this.name = name;
    }

    // TODO: remover esses BANGS ! e tratar os casos de erro
    protected connectInner(from: string, to: string, circuit: Circuit): void {
        let io: IOInterface  = this.getIOFromCircuit(to, circuit);
        this.inputs.get(from)!.connectToInner(io);
    }

    protected addInput(name: string): void {
        let input = new Input(this)
        input.addObserver((_) => { this.update() });

        this.inputs.set(name, input);
    }

    protected addOutput(name: string): void {
        let output = new Output(this);
        // output.addObserver((_) => { this.update() });

        this.outputs.set(name, output);
    }

    public toString(): string {
        return `${this.name}(${Array.from(this.inputs.keys()).join(", ")})`;
    }
}


