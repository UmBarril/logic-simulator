import P5 from "p5";
import { Drawable } from "../interfaces/drawable";

export class Ball implements Drawable {
    readonly rad: number;
    pos: P5.Vector;
    isDragging: boolean = false;

    constructor(p: P5, pos: P5.Vector){
        this.pos = pos
        this.rad = p.random(20, 40)
    }

    draw(p: P5){
        p.ellipse(this.pos.x, this.pos.y, this.rad*2)
    }

    update(p: P5){
        let mouse = p.createVector(p.mouseX, p.mouseY)
        let dis = P5.Vector.dist(this.pos, mouse)


        if (!this.isDragging)  {
            if (dis < this.rad && p.mouseIsPressed){
                this.isDragging = true
            }
        } else {
            if (!p.mouseIsPressed){
                this.isDragging = false
            }
            this.pos = mouse 
        }
    }
}