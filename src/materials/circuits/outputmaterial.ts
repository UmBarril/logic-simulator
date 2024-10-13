import P5 from "p5";
import { Directions } from "../../util/direction";
import { canvaPosToWebglPos } from "../../util/util";
import { KeyboardListener } from "../interfaces/keyboardlistener";
import { rotateKey as rotateClockWiseKey } from "../../util/settings";
import { Material } from "../interfaces/material";
import { Rectangle } from "../shapes/rectangle";
import { Circle } from "../shapes/circle";
import { Modifiers } from "../modifiers";
import { Line } from "../shapes/line";
import { TextBox } from "../ui/textbox";
import { Modifiers } from "../interfaces/modifiers";

/**
 * Essa classe representa um botão de saída de um circuito lógico.
 * O botão pode ser clicado e arrastado para criar uma linha.
 */
export class OutputMaterial extends Material implements KeyboardListener {
    
    private currentDirection: Directions = Directions.UP;
    private isDraggingLine: boolean = false;
    private isEnabled: boolean = false;
    private isMoving: boolean = false;
    private onMoving: () => void = () => {};

    private readonly buttonRad = 20;
    // private readonly bridgeWidth = 10;

    // pad distance from the button
    private readonly padDistance = 30;
    // pad side size
    private readonly padSize = 20;
    // dragging pad distance from the button
    private readonly dragPadDistance = 30;
    private readonly dragPadWidth = 30;
    private readonly dragPadHeight = 12;

    private dragPad: Rectangle
    private button: Circle
    private bridge: Line
    private pad: Rectangle
    private padX: number = 0;
    private padY: number = 0;

    constructor(
        p: P5,
        pos: P5.Vector, 
        // output: Output,
        // connectionManager: ConnectionManager
    ) {
        super(pos)

        this.dragPad = new Rectangle(
            p.createVector(0, 0), // vai mudar quando mudar a direção
            p.createVector(this.dragPadWidth, this.dragPadHeight),
            p.color(255, 255, 255),
            new Modifiers<Rectangle>()
                .addOnMousePressed((_) => {
                    this.isMoving = true
                    return false
                })
                .addOnMouseReleased((_, __) => {
                    this.isMoving = false
                    return false;
                })
        )

        this.button = new Circle(
            p.createVector(0, 0),
            this.buttonRad,
            p.color(255, 255, 0),
            // nao funciona para desativar pois ele apenas detecta quando clica dentro dele
            // usar connection manager depois para desativar (e ativar tbm talvez)
            new Modifiers<Circle>().addOnClick((circle) => {
                if (this.isEnabled){
                    circle.setColor(p.color(255, 0, 0))
                } else {  
                    circle.setColor(p.color(255, 0, 255))
                }
                // connectionManager.select(output)
                // todo...
                this.isEnabled = !this.isEnabled
                return true
            })
        )

        // Pad de conexão 
        // posição do canto superior esquerdo do pad 

        // Ponte entre o botão e o pad de conexão
        this.bridge = new Line(
            p.createVector(0, 0),
            p.createVector(0, -this.padDistance),
            10,
            p.color(255, 5, 100),
            new Modifiers<Line>().addZIndex(-1)
        )

        this.pad = new Rectangle(
            p.createVector(0, 0), // vai mudar quando mudar a direção
            p.createVector(this.padSize, this.padSize),
            p.color(255, 255, 255),
            new Modifiers<Rectangle>().addOnClick((_) => {
                this.isDraggingLine = !this.isDraggingLine
                return true
            })
        )
        
        this.addChild(this.dragPad)
        this.addChild(this.button)
        this.addChild(this.bridge)
        this.addChild(this.pad)

        this.updatePositions(p, this.currentDirection) // seta a direção padrão
    }

    updatePositions(p: P5, direction: Directions){
        switch (direction){
            case Directions.UP:
                this.onMoving = () => {
                    let mousePos = canvaPosToWebglPos(p, p.mouseX, p.mouseY)
                    this.pos = new P5.Vector(mousePos.x, mousePos.y - this.dragPadDistance - (this.dragPadHeight / 2))
                }
              
                this.dragPad.pos =
                    new P5.Vector(-this.dragPadWidth / 2, this.dragPadDistance)
                this.dragPad.setDimensions(this.dragPadWidth, this.dragPadHeight)

                this.pad.pos = 
                    new P5.Vector(-this.buttonRad / 2, - this.padDistance - this.padSize)
                this.pad.setDimensions(this.padSize, this.padSize)
                break

            case Directions.RIGHT:
                this.onMoving = () => {
                    let mousePos = canvaPosToWebglPos(p, p.mouseX, p.mouseY)
                    this.pos = p.createVector(
                        mousePos.x + this.dragPadDistance + (this.dragPadHeight / 2),
                        mousePos.y
                    )
                }

                this.dragPad.pos =
                    new P5.Vector(-this.dragPadDistance - this.dragPadHeight, -this.dragPadWidth / 2)
                this.dragPad.setDimensions(this.dragPadHeight, this.dragPadWidth)

                this.pad.pos = 
                    new P5.Vector(-this.buttonRad / 2, - this.padDistance - this.padSize)
                this.pad.setDimensions(this.padSize, this.padSize)
                break
            case Directions.DOWN:
                this.currentDirection = Directions.LEFT
                break
            case Directions.LEFT:
                this.currentDirection = Directions.UP
                break
        }
    }

    changeDirection(p: P5){
        switch (this.currentDirection){
            case Directions.UP:
                this.currentDirection = Directions.RIGHT
                break
            case Directions.RIGHT:
                this.currentDirection = Directions.DOWN
                break
            case Directions.DOWN:
                this.currentDirection = Directions.LEFT
                break
            case Directions.LEFT:
                this.currentDirection = Directions.UP
                break
        }
        this.updatePositions(p, this.currentDirection)
    }

    // keyboardlistener interface
    keyReleased(p: P5, key: string): void {
        // TODO
    }

    // keyboardlistener interface
    keyPressed(p: P5, key: string): void {
        if (
            key == rotateClockWiseKey &&
            this.isMoving
        ) {
            this.changeDirection(p)
        }
    }

    override draw(p: P5): void {

        if(this.isMoving){
            this.onMoving()
        }

        // Linha (caso esteja sendo arrastada)
        p.push()
        if (this.isDraggingLine){
            p.stroke(255)
            p.strokeWeight(10)

            let realPos = canvaPosToWebglPos(p, p.mouseX, p.mouseY)
            p.line(this.padX + this.padSize / 2, this.padY + this.padSize / 2, realPos.x, realPos.y)
        }
        p.pop()
    }

    override isInside(_: P5.Vector): boolean {
        return false; // não detectar
    }
}