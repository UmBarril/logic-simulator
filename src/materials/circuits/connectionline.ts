import P5 from "p5";
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";

export class ConnectionLine extends Material {

    constructor(
        private start: P5.Vector,
        private end: P5.Vector,
        private width: number,
        private color: P5.Color,
        modifiers: Modifiers<ConnectionLine> = new Modifiers()
    ) { 
        super(start, modifiers.addOnClick((self, pos) => {
                console.log("clicked on line")
                // this.color = p.color(p.random(255), p.random(255), p.random(255))
                return true;
            })
        )
    }

    draw(p: P5): void {
        p.push()
        p.translate(0,0,this.modifiers.zIndex)
        p.stroke(this.color)
        p.strokeWeight(this.width)
        p.line(this.start.x, this.start.y, this.end.x, this.end.y)
        p.pop()
    }

    isInside(pos: P5.Vector): boolean {
        return pos.dist(this.start) + pos.dist(this.end) <= this.start.dist(this.end) + this.width;
    }

}