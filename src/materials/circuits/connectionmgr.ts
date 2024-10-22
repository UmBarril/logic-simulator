import P5 from "p5"
import { ConnectionLine } from "./connectionline";
import { Material } from "../interfaces/material";
import { Vector } from "p5";
import { ConnectionPoint } from "./connectionpoint";
import { UnfinishedConnectionLine } from "./unfinishedline";
import { isOutputConnectionPoint as isOutput, OutputConnectionPoint } from "./outputconnectionpoint";
import { EditableCircuit } from "../../logic/editablecircuit";
import { InputConnectionPoint, isInputConnectionPoint as isInput } from "./inputconnectionpoint";

/**
 * ConnectionManager é responsável por gerenciar as conexões 
 * entre os componentes dentro de um circuito.
 * 
 * Para conectar um output a um input, o usuário deve selecionar um output e depois um input ou vice e versa.
 * @todo Implementar
 */
export class ConnectionManager extends Material {

    private selectedIO: ConnectionPoint | null = null

    private unfinishedConnectionLine: UnfinishedConnectionLine | null = null

    private outputs = new Map<OutputConnectionPoint, ConnectionLine>() 
    private inputs = new Map<InputConnectionPoint, ConnectionLine>() 

    constructor(
        // o circuito que esse ConnectionManager está editando nesse momento
        private circuit: EditableCircuit 
    ) { 
        super(new P5.Vector)
    }

    getCircuit(): EditableCircuit {
        return this.circuit
    }
    
    /**
     * Seleciona um IO.
     * mostrar visualmente que o IO foi selecionado (talvez muandar uma notificacao) @todo
     * @param output 
     */
    select(io: ConnectionPoint) {
        // disselecionar se clicar no mesmo
        if (this.selectedIO == null) {
            this.selectedIO = io
            this.unfinishedConnectionLine = new UnfinishedConnectionLine(this.selectedIO)
            return
        }

        // se tiver clicado no mesmo, desselecionar
        if (this.selectedIO == io) {
            this.unselect()
            return
        }

        if (this.selectedIO.getCircuit() == io.getCircuit()) {
            // não permitir conectar um input a outro input do mesmo circuito
            // talvez isso possa ser permitido no futuro, mas por enquanto não
            return 
        }

        let selectedIsParent = this.selectedIO.getIsParent()
        let ioIsParent = io.getIsParent()

        let connected = false
        if (selectedIsParent && ioIsParent) {
            connected = this.parent2(this.selectedIO, io)
        } 
        else if (selectedIsParent) {
            connected = this.parent1(this.selectedIO, io)
        }
        else if (ioIsParent) {
            connected = this.parent1(io, this.selectedIO)
        } 
        else  {
            connected = this.parent0(this.selectedIO, io)
        }
        if (!connected) {
            this.unselect()
        }
    }

    // nenhum é conexão do circuito pai (this.circuit)
    // se retornar false, não conectou. se true conectou
    private parent0(a: ConnectionPoint, b: ConnectionPoint): boolean {
        if (isOutput(a)) {
            if (isOutput(b)) {
                return false 
            } else if (isInput(b)) {
                let line = new ConnectionLine(a, b)
                this.outputs.set(a, line)
                this.inputs.set(b, line)

                this.circuit.connectOuter(a.getName(), b.getName(), this.circuit)
                return true
            }
        } else if (isInput(a)) {
            if (isOutput(b)) {
                let line = new ConnectionLine(b, a)
                this.outputs.set(b, line)
                this.inputs.set(a, line)

                this.circuit.connectOuter(b.getName(), a.getName(), this.circuit)
                return true 
            } else if (isInput(b)) {
                return false
            }
        }
        return false; // nunca deve chegar aqui
    }

    // a é conexão do circuito pai (this.circuit)
    // se retornar false, não conectou. se true conectou
    private parent1(a: ConnectionPoint, b: ConnectionPoint) {
        console.log("conectou")
        console.log(isOutput(a))
        console.log(isInput(a))
        console.log(a)
        // @ts-ignore
        console.log(a.discriminator)
        if (isOutput(a)) {
            if (isOutput(b)) {
                let line = new ConnectionLine(b, a)
                this.outputs.set(b, line)
                this.outputs.set(a, line)

                this.circuit.connectOuter(b.getName(), a.getName(), this.circuit)
                return true
            } else if (isInput(b)) {
                return false
            }
        } else if (isInput(a)) {
            if (isOutput(b)) {
                return false
            } else if (isInput(b)) {
                console.log("conectou")
                let line = new ConnectionLine(a, b)
                this.inputs.set(a, line)
                this.inputs.set(b, line)

                this.circuit.connectInner(a.getName(), b.getName(), this.circuit)
                return true
            }
        }
        return false; // nunca deve chegar aqui
    }

    // a e b são conexoes do circuito pai (this.circuit)
    // se retornar false, não conectou. se true conectou
    private parent2(a: ConnectionPoint, b: ConnectionPoint) {
        if (isOutput(a)) {
            if (isOutput(b)) {
                return false
            } else if (isInput(b)) {
                let line = new ConnectionLine(b, a)
                this.inputs.set(b, line)
                this.outputs.set(a, line)

                this.circuit.connectInner(b.getName(), a.getName(), this.circuit)
                return true
            }
        } else if (isInput(a)) {
            if (isOutput(b)) {
                let line = new ConnectionLine(a, b)
                this.inputs.set(a, line)
                this.outputs.set(b, line)

                this.circuit.connectInner(a.getName(), b.getName(), this.circuit)

            } else if (isInput(b)) {
                return false
            }
        }
        return false; // nunca deve chegar aqui
    }

    /**
     * Desseleciona o IO selecionado no momento.
     */
    unselect() {
        this.selectedIO = null
        this.unfinishedConnectionLine = null
    }

    // TODOFAST ESTÁ INCOMPLETO
    /**
     * Remove uma linha de conexão.
     * @param line Linha de Conexão
     */
    removeLine(line: ConnectionLine) {
        let io1 = line.getIo1()
        let io2 = line.getIo2()
        if (isInput(io1)) {
            this.inputs.delete(io1)
        } else if (isOutput(io1)) {
            this.outputs.delete(io1)
        }
        if (isInput(io2)) {
            this.inputs.delete(io2)
        } else if (isOutput(io2)) {
            this.outputs.delete(io2)
        }

        // TODOFAST TEM QUE TER UMA MANEIRA DE DISCONECTAR INNER
        // this.circuit.disconnectOuter(line.getIo2().getName())
    }

    // TODOFAST
    /**
     * Remove uma linha de conexão que contenha o ponto.
     * @param point Ponto de Conexão
     */
    // removeLineWith(point: ConnectionPoint) {
    //     if (this.inputs.has(point)) {
    //         let output = this.inputs.get(point)!.getIo1()
    //         this.outputs.delete(output)
    //         this.inputs.delete(point)
    //     } else if (this.outputs.has(point)) {
    //         let input = this.outputs.get(point)!.getIo2()
    //         this.inputs.delete(input)
    //         this.outputs.delete(point)
    //     }
    // }

    // não sei se gosto do connection manager desenhando as linhas assim, as tudo bem
    override draw(p: P5): void { 
        // Desenhando as linhas manualmente em vez de colorcar elas como filhos.
        // Não gosto muito de fazer isso pois estou repetindo código.
        // Mas dessa maneira tenho mais controle das linhas nessa classe.
        // TODO: melhorar
        this.unfinishedConnectionLine?.draw(p)
        this.outputs.forEach(line => line.draw(p))
    }

    // isIside não faz sentido para o ConnectionManager
    override isInside(pos: Vector): boolean {
        return false
    }
}