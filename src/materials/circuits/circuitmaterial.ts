import P5 from "p5";
import { Circuit } from "../../logic/circuit";
import { Directions } from "../../util/direction";
import { Modifiers } from "../modifiers";
import { ConnectionManager } from "./connectionmgr";
import { MaterialGroup } from "../interfaces/materialgroup";
import { Rectangle } from "../shapes/rectangle";
import { getMouseDelta, getMousePos } from "../../util/util";
import { TextBox } from "../ui/textbox";
import { CircuitOutputMaterial } from "./ios/circuitoutputmateial";
import { CircuitInputMaterial } from "./ios/circuitinputmaterial";

export class CircuitMaterial extends MaterialGroup {

    private _isDragging: boolean = false
    private direction: Directions = Directions.RIGHT

    private dimensions: P5.Vector 

    private readonly ioCircleRad = 10
    private readonly textSize = 22

    constructor(
        p: P5,
        pos: P5.Vector,
        connectionManager: ConnectionManager,
        private circuit: Circuit,
        private primaryColor = [255, 255, 255],
        private secondaryColor = [255, 255, 255],
    ) {
        super(pos)

        let inputs = this.circuit.getAllInputValues()
        let outputs = this.circuit.getAllOutputValues()

        let max = Math.max(inputs.size, outputs.size)

        // espaçamento entre o retângulo e os círculos
        let rectPadding = this.ioCircleRad
        // calcula a largura do retângulo baseado no tamanho do nome do circuito
        let rectWidth = circuit.getName().length * this.textSize
        // calcula a altura do retângulo baseado no número de inputs ou outputs
        let rectheight = max * this.ioCircleRad * 4

        // calculando o espaçamento entre os círculos, baseado na altura do retângulo 
        let inputCircleSpacing = rectheight / inputs.size
        let inputOffset = rectPadding + this.ioCircleRad
        inputs.forEach((value, name) => {
            inputOffset += inputCircleSpacing

            // TODO PERMITIR DEFINIR COR COM SECONDAYCOLOR
            let inputMaterial = new CircuitInputMaterial(
                name,
                connectionManager,
                new P5.Vector(0, inputOffset, 1),
                this.ioCircleRad,
                circuit
            )
            this.addChild(inputMaterial)
        })

        // calculando o espaçamento entre os círculos, baseado na altura do retângulo 
        let outputCircleSpacing = rectheight / (outputs.size + 1)
        let outputOffset = rectPadding 
        outputs.forEach((value, name) => {
            outputOffset += outputCircleSpacing

            // TODO PERMITIR DEFINIR COR COM SECONDAYCOLOR
            let outputMaterial = new CircuitOutputMaterial(
                name,
                connectionManager,
                new P5.Vector(rectWidth, outputOffset, 1),
                this.ioCircleRad,
                circuit
            )
            this.addChild(outputMaterial)
        })

        // agora, definimos o retângulo 
        this.dimensions = new P5.Vector(rectWidth, rectheight + rectPadding * 2)
        let rect = new Rectangle(
            p.createVector(0, 0),
            this.dimensions,
            p.color(primaryColor),
            new Modifiers<Rectangle>()
                .addOnMousePressed((m) => {
                    this._isDragging = true
                    return true
                })
                .addOnMouseReleased((m) => {
                    this._isDragging = false
                    return true
                })
        )
        this.addChild(rect)

        // adiciona o label com o nome do circuito
        let text = new TextBox(
            p,
            p.createVector(0, 55),
            circuit.getName(),
            this.textSize
        )
        this.addChild(text)
    }

    override draw(p: P5): void {
        super.draw(p)
        if (this._isDragging) {
            this.pos.add(this.scaleVector(getMouseDelta(p)))
        }
    }

    override isInside(pos: P5.Vector): boolean {
        let rectMiddle = this.realPos.copy().add(this.dimensions.copy().div(2))
        let dis_x = Math.abs(pos.x - rectMiddle.x)
        let dis_y = Math.abs(pos.y - rectMiddle.y)
        return dis_x < this.dimensions.x / 2 && dis_y < this.dimensions.y / 2 
    }
}