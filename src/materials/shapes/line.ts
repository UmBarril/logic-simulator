import P5 from "p5";
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";

export class Line extends Material {

    constructor(
        private start: P5.Vector,
        private end: P5.Vector,
        private width: number,
        private color: P5.Color,
        modifiers: Modifiers<Line> = new Modifiers()
    ) {
        super(start, modifiers)
    }
    
    draw(p: P5): void {
        p.push()
        p.translate(0,0,this.modifiers.zIndex)
        p.stroke(this.color)
        p.strokeWeight(this.width)
        p.line(
            this.pointOfOrigin.x + this.start.x,
            this.pointOfOrigin.y + this.start.y,
            this.pointOfOrigin.x + this.end.x,
            this.pointOfOrigin.y + this.end.y)
        p.pop()
    }

    /** @todo */
    isInside(pos: P5.Vector): boolean {
        return false;
    }

}