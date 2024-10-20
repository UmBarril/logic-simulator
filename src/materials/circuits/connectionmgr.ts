import P5 from "p5"
import { ConnectionLine } from "./connectionline";
import { Material } from "../interfaces/material";
import { Vector } from "p5";
import { ConnectionPoint, PointType } from "./connectionpoint";
import { UnfinishedConnectionLine } from "./unfinishedline";

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

    private outputs = new Map<ConnectionPoint, ConnectionLine>() 
    private inputs = new Map<ConnectionPoint, ConnectionLine>() 

    constructor() { 
        super(new P5.Vector)
    }

    /**
     * Seleciona um output.
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

        // conectar
        let connected = false
        if (io.getPointType() == PointType.OUTPUT) {
            if (this.selectedIO.getPointType() == PointType.INPUT) {
                // conectando
                io.connect(this.selectedIO)
                this.selectedIO.connect(io)

                // adicionando para ser desenhado
                let line = new ConnectionLine(io, this.selectedIO)

                this.outputs.set(io, line)
                this.inputs.set(this.selectedIO, line)
                // io.connect(this.selectedIO)
                connected = true
            }
        }
        else // se não, é um input
        { 
            if (this.selectedIO.getPointType() == PointType.OUTPUT) {
                // conectando
                io.connect(this.selectedIO)
                this.selectedIO.connect(io)

                // adicionando para ser desenhado
                let line = new ConnectionLine(this.selectedIO, io)
                this.outputs.set(io, line)
                this.inputs.set(this.selectedIO, line)
                connected = true
            }
        }

        if (!connected) {
            return
        }
        this.unselect()
    }

    /**
     * Desseleciona o IO selecionado no momento.
     */
    unselect() {
        this.selectedIO = null
        this.unfinishedConnectionLine = null
    }

    removeLine(line: ConnectionLine) {
        throw new Error('Method not implemented.')
    }

    removeLineWith(point: ConnectionPoint) {
        throw new Error('Method not implemented.')
    }

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