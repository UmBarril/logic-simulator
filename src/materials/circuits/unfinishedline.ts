import { Graphics, Vector } from "p5";
import { Material } from "../interfaces/material";
import { getMousePos } from "../../util/util";
import { ConnectionPoint } from "./connectionpoint";

export class UnfinishedConnectionLine extends Material {
    
    // por isso em um lugar que possa ser acessado pelo ConnectionLine tbm
    private readonly enabledColor = [255, 0, 0]
    private readonly disabledColor = [255, 255, 0]

    constructor(private io: ConnectionPoint) {
        super(new Vector(0, 0))
    }

    draw(p: import("p5") | Graphics): void {
        p.push()
            p.translate(0,0,this.realPos.z)

            if (this.io.getValue()) {
                p.stroke(p.color(this.enabledColor))
            } else {
                p.stroke(p.color(this.disabledColor))
            }
            p.stroke(p.color(255, 0, 0))
            p.strokeWeight(10)

            let mouse = getMousePos(p)
            let ioPos = this.io.getConnectionPointPosition()
            p.line(ioPos.x, ioPos.y, mouse.x, mouse.y)
        p.pop()
    }

    isInside(pos: Vector): boolean {
        return false
    }

}