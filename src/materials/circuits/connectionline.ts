import P5 from "p5";
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";
import { ConnectionPoint, PointType } from "./connectionpoint";

export class ConnectionLine extends Material {

    private readonly enabledColor = [255, 0, 0]
    private readonly disabledColor = [255, 255, 0]

    private readonly width = 10

    constructor(
        private output: ConnectionPoint,
        private input: ConnectionPoint,
        modifiers: Modifiers<ConnectionLine> = new Modifiers()
    ) { 
        if (output.getPointType() != PointType.OUTPUT) {
            console.log("io1 is not an output")
        }
        if (input.getPointType() != PointType.INPUT) {
            console.log("io2 is not an input")
        }
        super(
            new P5.Vector(0,0,1),
            modifiers.addOnClick((self, pos) => {
                console.log("clicked on line")
                // this.color = p.color(p.random(255), p.random(255), p.random(255))
                return true;
            })
        )
    }

    getInput(): ConnectionPoint {
        return this.input
    }

    setInput(input: ConnectionPoint) {
        this.input = input
    }

    getOutput(): ConnectionPoint {
        return this.output
    }

    setOutput(output: ConnectionPoint) {
        this.output = output
    }

    draw(p: P5): void {
        p.push()
            p.translate(0,0,this.realPos.z)

            if (this.input.getValue()) {
                p.stroke(p.color(this.enabledColor))
            } else {
                p.stroke(p.color(this.disabledColor))
            }
            p.strokeWeight(this.width)

            let inputPos = this.input.getConnectionPointPosition()
            let outputPos = this.output.getConnectionPointPosition()
            p.line(inputPos.x, inputPos.y, outputPos.x, outputPos.y)
        p.pop()
    }

    isInside(pos: P5.Vector): boolean {
        let start = this.input.getConnectionPointPosition()
        let end = this.output.getConnectionPointPosition()
        return pos.dist(start) + pos.dist(end) <= start.dist(end) + this.width;
    }

}