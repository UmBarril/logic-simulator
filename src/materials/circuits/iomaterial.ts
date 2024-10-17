import P5 from "p5";
import { Directions } from "../../util/direction";
import { getMousePos } from "../../util/util";
import { KeyboardListener } from "../interfaces/keyboardlistener";
import { rotateKey as rotateClockWiseKey } from "../../util/settings";
import { Rectangle } from "../shapes/rectangle";
import { Circle } from "../shapes/circle";
import { Line } from "../shapes/line";
import { TextBox } from "../ui/textbox";
import { Modifiers } from "../modifiers";
import { ConnectionManager } from "./connectionmgr";
import { MaterialGroup } from "../interfaces/materialgroup";

/**
 * Essa classe representa um botão de saída de um circuito lógico.
 * O botão pode ser clicado e arrastado para criar uma linha.
 */
export class IOMaterial extends MaterialGroup implements KeyboardListener {

    private readonly bridgeColor = [255, 5, 100]
    private readonly enabledColor = [255, 255, 0]
    private readonly disabledColor = [255, 0, 255]

    private readonly buttonRad = 20;

    // pad distance from the button
    private readonly connectionPointDistance = 30;
    private readonly connectionPointWidth = 20;
    // dragging pad distance from the button
    private readonly dragPadDistance = 30;
    private readonly dragPadWidth = 30;
    private readonly dragPadHeight = 12;
    private readonly labelDistance = this.dragPadDistance + 40;

    private readonly bridge: Line
    private readonly button: Circle
    private readonly connectionPoint: Rectangle
    private readonly dragPad: Rectangle
    private readonly label: TextBox
    
    private currentDirection: Directions = Directions.UP;
    private value: boolean = false; // valor do output
    private isMoving: boolean = false;
    private onMoving = () => { };

    constructor(
        p: P5,
        pos: P5.Vector, 
        // output: Output,
        connectionManager: ConnectionManager
    ) {
        super(pos)

        // todo: talvez remover isso, e fazer com que o output se mova ao arrastar a parte do botão
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
            p.color(255, 255, 0), // essa cor vai ser mudada depois
            // nao funciona para desativar pois ele apenas detecta quando clica dentro dele
            // usar connection manager depois para desativar (e ativar tbm talvez)
            new Modifiers<Circle>().addOnClick((circle) => {
                this.setValue(p, !this.value)
                return true
            })
        )

        // Pad de conexão 
        // posição do canto superior esquerdo do pad 

        // Ponte entre o botão e o pad de conexão
        this.bridge = new Line(
            p.createVector(0, 0),
            p.createVector(0, -this.connectionPointDistance),
            10,
            p.color(this.bridgeColor),
            new Modifiers<Line>().addZIndex(-1)
        )

        this.connectionPoint = new Rectangle(
            p.createVector(0, 0), // vai mudar quando mudar a direção
            p.createVector(this.connectionPointWidth, this.connectionPointWidth),
            p.color(255, 255, 255),
            new Modifiers<Rectangle>().addOnClick((_) => {
                connectionManager.select(this)
                return true
            })
        )

        this.label = new TextBox(
            p,
            p.createVector(0, this.labelDistance),
            "Output", // mudar
            // 50,
            // new Modifiers<TextBox>()
                // .addZIndex(1)
        )
        
        this.addChild(this.dragPad)
        this.addChild(this.button)
        this.addChild(this.bridge)
        this.addChild(this.connectionPoint)
        this.addChild(this.label)

        this.updatePositions(p, this.currentDirection) // seta a direção padrão
    }

    public getValue(): boolean {
        return this.value
    }

    // NOTA: talvez isso possa ser um valor inteiro no futuro...
    // NOTA2: EU REALMENTE NÃO GOSTO que essa função precise receber uma instância de P5
    //        RESOLVER ISSO DEPOIS.
    public setValue(p: P5, value: boolean) {
        this.value = value
        if (this.value){
            this.button.setColor(p.color(this.enabledColor))
        } else {  
            this.button.setColor(p.color(this.disabledColor))
        }
    }

    public getConnectionPointPos(): P5.Vector {
        return P5.Vector.add(this.connectionPoint.realPos, new P5.Vector(this.connectionPointWidth / 2, this.connectionPointWidth / 2))
    }

    private updatePositions(p: P5, direction: Directions){
        switch (direction){
            case Directions.UP:
                this.onMoving = () => {
                    let mousePos = getMousePos(p)
                    this.pos = new P5.Vector(mousePos.x, mousePos.y - this.dragPadDistance - (this.dragPadHeight / 2))
                }
              
                this.dragPad.pos =
                    new P5.Vector(-this.dragPadWidth / 2, this.dragPadDistance)
                this.dragPad.setDimensions(this.dragPadWidth, this.dragPadHeight)

                this.connectionPoint.pos = 
                    new P5.Vector(-this.buttonRad / 2, - this.connectionPointDistance - this.connectionPointWidth)
                this.connectionPoint.setDimensions(this.connectionPointWidth, this.connectionPointWidth)
                break

            case Directions.RIGHT:
                this.onMoving = () => {
                    let mousePos = getMousePos(p)
                    this.pos = p.createVector(
                        mousePos.x + this.dragPadDistance + (this.dragPadHeight / 2),
                        mousePos.y
                    )
                }

                this.dragPad.pos =
                    new P5.Vector(-this.dragPadDistance - this.dragPadHeight, -this.dragPadWidth / 2)
                this.dragPad.setDimensions(this.dragPadHeight, this.dragPadWidth)

                this.connectionPoint.pos = 
                    new P5.Vector(-this.buttonRad / 2, - this.connectionPointDistance - this.connectionPointWidth)
                this.connectionPoint.setDimensions(this.connectionPointWidth, this.connectionPointWidth)
                break
            case Directions.DOWN:
                this.currentDirection = Directions.LEFT
                break
            case Directions.LEFT:
                this.currentDirection = Directions.UP
                break
        }
    }

    /**
     * Rotaciona este material em sentido horário
     * @param p P5
     */
    private changeDirection(p: P5){
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

    // aqui o draw funciona mais como um update
    override draw(p: P5): void {
        super.draw(p)

        // se tiver movendo, atualiza a posição
        if(this.isMoving){
            this.onMoving()
        }
    }

    // keyboardlistener interface
    keyReleased(p: P5, key: string): void { }

    // keyboardlistener interface
    keyPressed(p: P5, key: string): void {
        if (
            key == rotateClockWiseKey &&
            this.isMoving
        ) {
            this.changeDirection(p)
        }
    }
}