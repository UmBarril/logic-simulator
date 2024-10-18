import P5 from "p5"
import { ConnectionManager } from "../materials/circuits/connectionmgr";
import { MaterialGroup } from "../materials/interfaces/materialgroup";

export class Workspace extends MaterialGroup {

    private _connectionManager = new ConnectionManager()

    private _scale = 1 // zoom
    private offset: P5.Vector // offset da posição dos items na workspace
    private dragging = false // se estamos arrastando a workspace

    constructor() { 
        super(new P5.Vector(0, 0)) 
        this.offset = new P5.Vector(0, 0)
    }

    public get connectionManager() {
        return this._connectionManager;
    }

    public set scale(zoom: number) {
        this._scale = zoom
    }

    public get scale() {
        return this._scale
    }

    /**
     * Rotaciona os itens selecionados
     */
    rotateSelected(p: P5) {
        throw new Error("Method not implemented.");
    }

    windowResized(p: P5) {
        // throw new Error("Method not implemented.");
        // TODO
    }

    /**
     * Reseta a posição da workspace
     */
    resetPosition(p: P5) {
        this.offset = p.createVector(0, 0) // vai para o meio
    }

    /**
     * Retorna a posição do mouse dentro da workspace
     * @param p P5
     */
    posInsideWorkspace(pos: P5.Vector): P5.Vector {
        // calculo está errado, corrigir depois TODO
        return pos.add(this.offset).mult(1/this.scale)
    }

    override draw(p: P5): void {
        if (this.dragging) {
            // https://editor.p5js.org/palpista11/sketches/XRx0nlsXi
            // TODO: tornar isso mais suave e natural
            p.cursor(p.HAND)
            let change = p.createVector(
                p.map(p.mouseX - p.pmouseX, -100, 100, -0.5, 0.5, true), 
                p.map(p.mouseY - p.pmouseY, -100, 100, -0.5, 0.5, true)
            ).mult(this._scale)

            this.offset.add(change)
        }
        // ZOOM E MOVIMENTO AINDA NÃO FUNCIONAM
        // DEIXANDO O CÓDIGO AQUI PARA QUANDO FOR CORRIGIDO VVVV
        // p.translate(this.offset.x * p.width / 2, this.offset.y * p.height / 2)
        // p.scale(this._scale) // zoom

        super.draw(p)
        this._connectionManager.draw(p)
    }

    // TODO: verificar se o clique foi numa parte da ui
    override mouseClicked(p: P5, pos: P5.Vector): boolean {
        console.log(this.posInsideWorkspace(pos))
        let childWasClicked = super.mouseClicked(p, this.posInsideWorkspace(pos))
        if (!childWasClicked){
            this.connectionManager.unselectIfSelected()   
        }
        return true
    }

    override mousePressed(p: P5, pos: P5.Vector): boolean {
        let childWasPressed = super.mousePressed(p, this.posInsideWorkspace(pos))
        if (!childWasPressed){
            this.dragging = true
        }
        return true
    }

    override mouseReleased(p: P5, pos: P5.Vector): boolean {
        super.mouseReleased(p, this.posInsideWorkspace(pos))
        this.dragging = false
        return true
    }
}