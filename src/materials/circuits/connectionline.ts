import P5 from "p5";
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";
import { getMousePos } from "../../util/util";
import { ConnectionPoint } from "./connectionpoint";

export class ConnectionLine extends Material {

    private readonly enabledColor = [255, 0, 0]
    private readonly disabledColor = [255, 255, 0]

    private readonly width = 10

    constructor(
        private io1: ConnectionPoint,
        private io2: ConnectionPoint,
        modifiers: Modifiers<ConnectionLine> = new Modifiers()
    ) { 
        super(
            new P5.Vector(0,0,1),
            modifiers.addOnClick((self, pos) => {
                console.log("clicked on line")
                // this.color = p.color(p.random(255), p.random(255), p.random(255))
                return true;
            })
        )
    }

    setIo1(input: ConnectionPoint) {
        this.io1 = input
    }

    setIo2(output: ConnectionPoint) {
        this.io2 = output
    }

    draw(p: P5): void {
        p.push()
            p.translate(0,0,this.realPos.z)

            if (this.io1.getValue()) {
                p.stroke(p.color(this.enabledColor))
            } else {
                p.stroke(p.color(this.disabledColor))
            }
            p.strokeWeight(this.width)

            // ainda não está conectado com outro io, mover segundo o mouse
            if (this.io1 == null) {
                let mouse = getMousePos(p)
                let io2Pos = this.io2.getConnectionPointPosition()
                p.line(io2Pos.x, io2Pos.y, mouse.x, mouse.y)
            } else if (this.io2 == null) {
                let mouse = getMousePos(p)
                let io1Pos = this.io1.getConnectionPointPosition()
                p.line(io1Pos.x, io1Pos.y, mouse.x, mouse.y)
            } else {
                let io1Pos = this.io1.getConnectionPointPosition()
                let io2Pos = this.io2.getConnectionPointPosition()
                p.line(io1Pos.x, io1Pos.y, io2Pos.x, io2Pos.y)
            }
        p.pop()
    }

    isInside(pos: P5.Vector): boolean {
        let start = this.io1.getConnectionPointPosition()
        let end = this.io2?.getConnectionPointPosition()
        if (end == null) {
            return false
        }
        return pos.dist(start) + pos.dist(end) <= start.dist(end) + this.width;
    }

}