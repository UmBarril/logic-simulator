import P5 from "p5"
import { ConnectionLine } from "./connectionline";
import { Material } from "../interfaces/material";
import { Vector } from "p5";
import { ConnectionPoint, PointType } from "./connectionpoint";
import { UnfinishedConnectionLine } from "./unfinishedline";
import { Circuit } from "../../logic/circuit";
import { OutputConnectionPoint } from "./outputconnectionpoint";
import { InputConnectionPoint } from "./inputconnectionpoint";

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

    constructor(
        // o circuito que esse ConnectionManager está editando nesse momento
        private circuit: Circuit 
    ) { 
        super(new P5.Vector)
    }

    getCircuit(): Circuit {
        return this.circuit
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
                this.addConnection(io as InputConnectionPoint, this.selectedIO)
                connected = true
            }
        }
        else // se não, é um input
        { 
            if (this.selectedIO.getPointType() == PointType.OUTPUT) {
                this.addConnection(this.selectedIO as InputConnectionPoint, io)
                connected = true
            }
        }

        if (!connected) {
            return
        }
        this.unselect()
    }

    private addConnection(input: InputConnectionPoint, output: OutputConnectionPoint) {
        // conectando
        input.connect(output)
        output.connect(input)

        // adicionando para ser desenhado
        let line = new ConnectionLine(output, input)

        this.inputs.set(input, line)
        this.outputs.set(output, line)

        this.circuit.addConnection(input, output)
    }

    /**
     * Desseleciona o IO selecionado no momento.
     */
    unselect() {
        this.selectedIO = null
        this.unfinishedConnectionLine = null
    }

    /**
     * Remove uma linha de conexão.
     * @param line Linha de Conexão
     */
    removeLine(line: ConnectionLine) {
        this.inputs.delete(line.getInput())
        this.outputs.delete(line.getOutput())
    }

    /**
     * Remove uma linha de conexão que contenha o ponto.
     * @param point Ponto de Conexão
     */
    removeLineWith(point: ConnectionPoint) {
        if (this.inputs.has(point)) {
            let output = this.inputs.get(point)!.getOutput()
            this.outputs.delete(output)
            this.inputs.delete(point)
        } else if (this.outputs.has(point)) {
            let input = this.outputs.get(point)!.getInput()
            this.inputs.delete(input)
            this.outputs.delete(point)
        }
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