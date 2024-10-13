import P5 from "p5"
import { ConnectionLine } from "./connectionline";
import { IOMaterial } from "./iomaterial";
import { Material } from "../interfaces/material";
import { Input } from "../../logic/input";
import { Output } from "../../logic/output";
import { Vector } from "p5";

/**
 * ConnectionManager é responsável por gerenciar as conexões 
 * entre os componentes dentro de um circuito.
 * 
 * Para conectar um output a um input, o usuário deve selecionar um output e depois um input ou vice e versa.
 * @todo Implementar
 */
export class ConnectionManager extends Material {
    
    private selectedIO: IOMaterial | null = null
    private connectionLines: ConnectionLine[] = []

    constructor() { 
        super(new P5.Vector)
    }

    /**
     * Seleciona um output.
     * @param output 
     */
    select(io: IOMaterial) {
        // disselecionar se clicar no mesmo
        if (this.selectedIO == null) {
            this.selectedIO = io

            let netLine = new ConnectionLine(this, io, io.getValue())
            this.connectionLines.push(netLine)
            // SceneManager.currentScene.add(this.connectionLine)
            return
        }

        if (this.selectedIO == io) {
            this.selectedIO = null
            // this.
            return
        }

        // conectar
        if (this.selectedIO instanceof Output) {
            // conectar output a input
            if (io instanceof Input) {
                this.selectedIO.connect(io)
            }
        } else if (io instanceof Output) {
            // conectar input a output
            if (this.selectedIO instanceof Input) {
                io.connect(this.selectedIO)
            }
        }

        this.selectedIO = io
        // TODO: mostrar visualmente que o IO foi selecionado (talvez muandar uma notificacao)
    }

    draw(p: P5): void { 
        // Desenhando as linhas manualmente em vez de colorcar elas como filhos.
        // Não gosto muito de fazer isso pois estou repetindo código.
        // Mas dessa maneira tenho mais controle das linhas nessa classe.
        // TODO: melhorar
        this.connectionLines.forEach(line => line.draw(p))
    }

    isInside(pos: Vector): boolean {
        return true
    }
}