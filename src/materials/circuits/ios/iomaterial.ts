import P5 from "p5";
import { Directions } from "../../../util/direction";
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
import { disabledColor } from "../colors";
import { getMouseDelta } from "../../../util/util";

/**
 * Essa classe representa um saída ou entrada de um circuito lógico.
 * O botão pode ser clicado e arrastado para criar uma linha.
 * Para usar este material, veja {@link OutputMaterial} e {@link InputMaterial}
 */
export abstract class IOMaterial extends MaterialGroup implements KeyboardListener, ConnectionPoint {

    private readonly bridgeColor = [255, 5, 100]

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
    
    private _connectedConnectionPoint: ConnectionPoint | null = null

    private currentDirection: Directions = Directions.UP;
    private isMoving: boolean = false;

    // TODO: implementar uma maneira genérica para isso
    private onMoving = () => { };

    protected constructor(
        p: P5,
        private name: string,
        pos: P5.Vector, 
        protected connectionManager: ConnectionManager,
        onButtonClick: (button: Circle) => boolean,
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
            disabledColor, // essa cor vai ser mudada depois
            // nao funciona para desativar pois ele apenas detecta quando clica dentro dele
            // usar connection manager depois para desativar (e ativar tbm talvez)
            new Modifiers<Circle>().addOnClick(onButtonClick)
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
            name, // mudar
            // 50,
        )
        
        this.addChild(this.dragPad)
        this.addChild(this.button)
        this.addChild(this.bridge)
        this.addChild(this.connectionPoint)
        this.addChild(this.label)

        this.updatePositions(p, this.currentDirection) // seta a direção padrão
    }

    abstract updateValue(value: boolean): void

    abstract getValue(): boolean

    protected setButtonColor(color: number[]): void {
        this.button.setColor(color)
    }

    public getCircuit() {
        // Quando esse input é criado, ele pertence ao circuito no connectionManager
        return this.connectionManager.getCircuit() 
    }

    getName(): string {
        return this.name
    }

    connect(connectionPoint: ConnectionPoint): void {
        this._connectedConnectionPoint = connectionPoint
    }

    disconnect(): void {
        this._connectedConnectionPoint = null
    }

    getConnectedConnectionPoint(): ConnectionPoint | null {
        return this._connectedConnectionPoint
    }

    getIsParent(): boolean {
        return true
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
                this.dragPad.pos =
                    new P5.Vector(-this.dragPadWidth / 2, this.dragPadDistance)
                this.dragPad.setDimensions(this.dragPadWidth, this.dragPadHeight)

                this.connectionPoint.pos = 
                    new P5.Vector(-this.buttonRad / 2, - this.connectionPointDistance - this.connectionPointWidth)
                this.connectionPoint.setDimensions(this.connectionPointWidth, this.connectionPointWidth)
                break

            case Directions.RIGHT:
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
    private changeDirection(p: P5) {
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
            this.pos.add(getMouseDelta(p))
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