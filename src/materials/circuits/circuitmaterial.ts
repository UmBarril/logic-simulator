import P5 from "p5";
import { Circuit } from "../../logic/circuit";
import { Directions } from "../../util/direction";
import { Material } from "../interfaces/material";
import { Circle } from "../shapes/circle";
import { Modifiers } from "../modifiers";
import { ConnectionManager } from "./connectionmgr";

export class CircuitMaterial extends Material {

    private _isDragging: boolean = false
    private direction: Directions = Directions.RIGHT

    private dimensions = new P5.Vector(100, 100)

    private readonly ioOffset = 5
    private readonly ioCircleRad = 10

    private inputs: Circle[] = []
    private outputs: Circle[] = []

    constructor(
        p: P5,
        pos: P5.Vector,
        connectionManager: ConnectionManager,
        private circuit: Circuit
    ) {
        super(pos)

        let iOffset = this.ioOffset
        this.circuit.getInputs().forEach(_ => {
            // TODO: trocar esse Circle por um IOMaterial ou algo do tipo
            //      talvez criar uma nova classe similar a IOMaterial, mas para ser usada em circuitos
            let input = new Circle(
                new P5.Vector(0, iOffset),
                this.ioCircleRad,
                p.color(0, 255, 0),
                new Modifiers<Circle>().addOnClick((m) => {
                    connectionManager.select(m.input) // @todo
                    return true
                })
            )
            this.addChild(input)
            iOffset += this.ioOffset
        })

        let oOffset = this.ioOffset
        this.circuit.getOutputs().forEach(_ => {
            let input = new Circle(
                // mesma coisa que o mais acima
                new P5.Vector(this.dimensions.x, oOffset),
                this.ioCircleRad,
                p.color(0, 255, 0), // @todo fazer isso trocar de cor
                new Modifiers<Circle>().addOnClick((m) => {
                    connectionManager.select(m.input) // @todo
                    return true
                })
            )
            this.addChild(input)
            oOffset += this.ioOffset
        })

    }

    draw(p: P5){
        p.push()

            p.rect(this.pos.x, this.pos.y, this.dimensions.x, this.dimensions.y)

            p.push()
                p.fill(0, 255, 0)
            p.pop()

        p.pop()
    }

    update(p: P5){
        // A posição do mouse é relativa ao canto superior esquerdo do canvas
        // enquanto a posição do retângulo é relativa ao canto superior esquerdo do retângulo
        let mouse = p.createVector(p.mouseX, p.mouseY)

        // Calcula a distância do mouse ao centro do retângulo
        let dis_x = Math.abs(mouse.x - (this.pos.x + (this.dimensions.x / 2)))
        let dis_y = Math.abs(mouse.y - (this.pos.y + (this.dimensions.y / 2)))

        if (!this._isDragging)  {
            let isInside = 
                dis_x < this.dimensions.x / 2 && 
                dis_y < this.dimensions.y / 2
            if (isInside && p.mouseIsPressed){
                this._isDragging = true
            }
        } else {
            if (!p.mouseIsPressed){
                this._isDragging = false
            }
            this.pos = mouse.add(p.createVector(-this.dimensions.x / 2, -this.dimensions.y / 2))
        }
    }

    isInside(pos: P5.Vector): boolean {
        let rectMiddle = this.realPos.copy().add(this.dimensions.copy().div(2))
        let dis_x = Math.abs(pos.x - rectMiddle.x)
        let dis_y = Math.abs(pos.y - rectMiddle.y)
        return dis_x < this.dimensions.x / 2 && dis_y < this.dimensions.y / 2 
    }
}