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
        // position não importa aqui
        super(new P5.Vector(0, 0, -1), modifiers)
    }
    
    setStart(start: P5.Vector): void {
        this.start = start
    }

    setEnd(end: P5.Vector): void {
        this.end = end
    }

    draw(p: P5): void {
        p.push()

        p.scale(this.getScale())
        p.translate(0,0,this.pos.z)
        p.stroke(this.color)
        p.strokeWeight(this.width * this.getScale())

        let start = this.start
        let end = this.end

        p.line(
            this.pointOfOrigin.x + start.x,
            this.pointOfOrigin.y + start.y,
            this.pointOfOrigin.x + end.x,
            this.pointOfOrigin.y + end.y)
        p.pop()
    }

    isInside(pos: P5.Vector): boolean {
        let start = this.start
        let end = this.end
        return pos.dist(start) + pos.dist(end) <= start.dist(end) + this.width;
    }

}