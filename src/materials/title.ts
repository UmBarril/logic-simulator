import P5 from "p5";
import { Drawable } from "../interfaces/drawable";

export class RotatingTitle implements Drawable {
    private title: string;
    private pos: P5.Vector;
    private textSize = 100;

    constructor(title: string, pos: P5.Vector) {
        this.title = title;
        this.pos = pos;
    }

    draw(p: P5): void {
        // p.rotateY(p.frameCount * 0.01);
        p.fill(0, 102, 153, 255)
        // p.textFont('Arial');
        // p.textSize(this.textSize);
        p.stroke(0);
        p.strokeWeight(4);
        p.text(this.title, this.pos.x, this.pos.y, 50, 50);
        // p.square(this.pos.x, this.pos.y, 50);
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }
}