import P5 from "p5";
import { Drawable } from "../interfaces/drawable";
import { Clickable } from "../interfaces/clickable";
import { Directions } from "../util/direction";
import { canvaPosToWebglPos } from "../util/util";
import { KeyboardListener } from "../interfaces/keyboardlistener";

/**
 * Essa classe representa um botão de saída de um circuito lógico.
 * O botão pode ser clicado e arrastado para criar uma linha.
 */
export class OutputButton implements Drawable, Clickable, KeyboardListener {
    private currentDirection: Directions = Directions.UP;
    isDraggingLine: boolean = false;
    isEnabled: boolean = false;
    isMoving: boolean = false;

    readonly buttonRad = 20;
    readonly bridgeWidth = 10;

    // pad distance from the button
    readonly padDistance = 30;
    // pad side size
    readonly padSize = 20;
    // dragging pad distance from the button;w
    readonly dragPadDistance = 30;
    readonly dragPadWidth = 30;
    readonly dragPadHeight = 12;

    pos: P5.Vector;

    padX: number = 0
    padY: number = 0
    draggingX: number = 0
    draggingY: number = 0

    constructor(pos: P5.Vector) {
        this.pos = pos;
        // Direção padrão
        // this.changeDirection(Directions.UP)
    }

    // keyboardlistener interface
    keyPressed(p: P5, key: string): void {
        throw new Error("Method not implemented.");
    }
    
    // clickable interface
    pressed(p: P5, pos: P5.Vector): void {
        if (
            pos.x > this.draggingX && pos.x < this.draggingX + this.padSize &&
            pos.y > this.draggingY && pos.y < this.draggingY + this.padSize
        ) {
            this.isMoving = !this.isMoving;
        } 
    }

    // clickable interface
    released(p: P5, pos: P5.Vector): void {
        if (this.isMoving) {
            this.isMoving = false;
        }
    }

    // clickable interface
    click(p: P5, pos: P5.Vector): void {
        // Botão de ligar e desligar
        let dis = P5.Vector.dist(this.pos, pos);
        console.log("x = " + pos.x + " y = " + pos.y);
        console.log(dis);
        if (dis < this.buttonRad) {
           this.isEnabled = !this.isEnabled ;
           console.log("foi");
        } 

        // Pad de conexão TODO
        if (
            pos.x > this.padX && pos.x < this.padX + this.padSize &&
            pos.y > this.padY && pos.y < this.padY + this.padSize
        ) {
            this.isDraggingLine = !this.isDraggingLine;
        } else if (this.isDraggingLine){
            this.isDraggingLine = false;
        }
    }

    draw(p: P5){
        switch (this.currentDirection){
            case Directions.UP:
                // Dragging
                this.draggingX = this.pos.x - this.dragPadWidth / 2
                this.draggingY = this.pos.y + this.dragPadDistance
                
                p.push()
                p.noStroke()
                p.fill(255, 255, 255) // branco
                p.rect(this.draggingX, this.draggingY, this.dragPadWidth, this.dragPadHeight)
                p.pop()

                // Pad de conexão 
                // posição do canto superior esquedo do pad 
                this.padX = this.pos.x - (this.buttonRad / 2)
                this.padY = this.pos.y - this.padDistance - this.padSize

                // Ponte entre o botão e o pad de conexão
                p.push()
                p.stroke(255, 5, 100)
                p.strokeWeight(10)
                p.line(this.pos.x, this.pos.y, this.padX + this.padSize / 2, this.padY + this.padSize / 2)
                p.pop()

                // O próprio pad de conexão
                p.push()
                p.noStroke()
                p.fill(255, 255, 255) // branco
                p.rect(this.padX, this.padY, this.padSize, this.padSize)
                p.pop()

                break
            case Directions.RIGHT:

                break;
            case Directions.DOWN:
                break;
            case Directions.LEFT:
                break;
        }

        // Botão de ligar e desligar  
        p.push()
        if (this.isEnabled){
            p.fill(255, 255, 0)
        } else {  
            p.fill(255, 0, 255)
        }
        p.ellipse(this.pos.x, this.pos.y, this.buttonRad*2)
        p.pop()

        // Linha (caso esteja sendo arrastada)
        p.push()
        if (this.isDraggingLine){
            p.stroke(255)
            p.strokeWeight(10)

            let realPos = canvaPosToWebglPos(p, p.mouseX, p.mouseY)
            p.line(this.padX + this.padSize / 2, this.padY + this.padSize / 2, realPos.x, realPos.y)
        }

        // TODO: fazer o centro de movimento cer em cima do dragging pad
        if (this.isMoving) {
            this.pos = canvaPosToWebglPos(p, p.mouseX, p.mouseY)
        }
    }
}