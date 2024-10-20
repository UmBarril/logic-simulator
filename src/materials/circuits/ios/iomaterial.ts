import P5 from "p5";
import { Directions } from "../../../util/direction";
import { getMousePos } from "../../../util/util";
import { KeyboardListener } from "../../interfaces/keyboardlistener";
import { rotateKey as rotateClockWiseKey } from "../../../util/settings";
import { Rectangle } from "../../shapes/rectangle";
import { Circle } from "../../shapes/circle";
import { Line } from "../../shapes/line";
import { TextBox } from "../../ui/textbox";
import { Modifiers } from "../../modifiers";
import { ConnectionManager } from "../connectionmgr";
import { MaterialGroup } from "../../interfaces/materialgroup";
import { ConnectionPoint, PointType } from "../connectionpoint";
import { IOState } from "../../../logic/iostate";

/**
 * Essa classe representa um saída ou entrada de um circuito lógico.
 * O botão pode ser clicado e arrastado para criar uma linha.
 * Para usar este material, veja {@link OutputMaterial} e {@link InputMaterial}
 */
export abstract class IOMaterial extends MaterialGroup implements KeyboardListener, ConnectionPoint {

    private readonly bridgeColor = [255, 5, 100]
    // fazer essas cores serem configuráveis e compartilhadas entre os connectionpoints/lines
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
    private isMoving: boolean = false;

    // TODO: implementar uma maneira genérica para isso
    private onMoving = () => { };

    protected constructor(
        p: P5,
        pos: P5.Vector, 
        name: string,
        connectionManager: ConnectionManager,
        private type: PointType,
        buttonClickDisabled: boolean
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
            [255, 255, 0], // essa cor vai ser mudada depois
            // nao funciona para desativar pois ele apenas detecta quando clica dentro dele
            // usar connection manager depois para desativar (e ativar tbm talvez)
            new Modifiers<Circle>().addOnClick((circle) => {
                if (buttonClickDisabled) return false
                this.updateValue(!this.getValue())
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
            p.createVector(0, this.labelDistance /*, -1 */),
            state.getName(), // mudar
            // 50,
        )
        
        this.addChild(this.dragPad)
        this.addChild(this.button)
        this.addChild(this.bridge)
        this.addChild(this.connectionPoint)
        this.addChild(this.label)

        this.updatePositions(p, this.currentDirection) // seta a direção padrão
    }

    connect(connectionPoint: ConnectionPoint): void {
        this.connectedIO = connectionPoint.getState()
    }

    disconnect(connectionPoint: ConnectionPoint): void {
        this.state.disconnect(connectionPoint.getState())
    }

    getConnectedConnectionPoint(): ConnectionPoint | null {
        throw new Error('Method not implemented.');
    }

    getPointType(): PointType {
        return this.type;
    }

    // ConnectionPoint
    public getValue(): boolean {
        return this.state.getValue()
    }

    // ConnectionPoint
    public updateValue(value: boolean) {
        this.state.setValue(value)
        console.log(this.state.getName(), value)
        if (this.state.getValue()){
            this.button.setColor(this.enabledColor)
        } else {  
            this.button.setColor(this.disabledColor)
        }
    }

    // ConnectionPoint
    public getConnectionPointPosition(): P5.Vector {
        return P5.Vector.add(
            this.connectionPoint.realPos,
            new P5.Vector(this.connectionPointWidth / 2, this.connectionPointWidth / 2)
        )
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
    // Material
    override draw(p: P5): void {
        super.draw(p)

        // se tiver movendo, atualiza a posição
        if(this.isMoving){
            this.onMoving()
        }
    }

    // KeyboardListener interface
    keyReleased(p: P5, key: string): void { }

    // KeyboardListener interface
    keyPressed(p: P5, key: string): void {
        if (
            key == rotateClockWiseKey &&
            this.isMoving
        ) {
            this.changeDirection(p)
        }
    }
}