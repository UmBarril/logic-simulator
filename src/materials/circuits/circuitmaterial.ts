import P5 from "p5";
import { Circuit } from "../../logic/circuit";
import { Directions } from "../../util/direction";
import { Modifiers } from "../modifiers";
import { ConnectionManager } from "./connectionmgr";
import { MaterialGroup } from "../interfaces/materialgroup";
import { Rectangle } from "../shapes/rectangle";
import { getMousePos } from "../../util/util";
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
        private circuit: Circuit
    ) {
        super(pos)

        let inputs = this.circuit.getInputs()
        let outputs = this.circuit.getOutputs()

        let max = Math.max(inputs.length, outputs.length)

        // espaçamento entre o retângulo e os círculos
        let rectPadding = this.ioCircleRad
        // calcula a largura do retângulo baseado no tamanho do nome do circuito
        let rectWidth = circuit.name.length * this.textSize
        // calcula a altura do retângulo baseado no número de inputs ou outputs
        let rectheight = max * this.ioCircleRad * 4

        // calculando o espaçamento entre os círculos, baseado na altura do retângulo 
        let inputCircleSpacing = rectheight / inputs.length
        let inputOffset = rectPadding + this.ioCircleRad
        inputs.forEach(i => {
            inputOffset += inputCircleSpacing

            let inputMaterial = new CircuitInputMaterial(
                i.name,
                connectionManager,
                new P5.Vector(0, inputOffset, 1),
                this.ioCircleRad,
                circuit
            )
            this.addChild(inputMaterial)
        })

        // calculando o espaçamento entre os círculos, baseado na altura do retângulo 
        let outputCircleSpacing = rectheight / (outputs.length + 1)
        let outputOffset = rectPadding 
        outputs.forEach(o => {
            outputOffset += outputCircleSpacing

            let outputMaterial = new CircuitOutputMaterial(
                o.name,
                connectionManager,
                new P5.Vector(rectWidth, outputOffset, 1),
                this.ioCircleRad,
            )
            this.addChild(outputMaterial)
        })

        // agora, definimos o retângulo 
        this.dimensions = new P5.Vector(rectWidth, rectheight + rectPadding * 2)
        let rect = new Rectangle(
            p.createVector(0, 0),
            this.dimensions,
            p.color(255, 255, 255),
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
            p.createVector(0, 0),
            circuit.name,
            this.textSize
        )
        this.addChild(text)
    }

    override draw(p: P5): void {
        super.draw(p)
        if (this._isDragging) {
            this.pos = getMousePos(p)
        }
    }

    override isInside(pos: P5.Vector): boolean {
        let rectMiddle = this.realPos.copy().add(this.dimensions.copy().div(2))
        let dis_x = Math.abs(pos.x - rectMiddle.x)
        let dis_y = Math.abs(pos.y - rectMiddle.y)
        return dis_x < this.dimensions.x / 2 && dis_y < this.dimensions.y / 2 
    }
}