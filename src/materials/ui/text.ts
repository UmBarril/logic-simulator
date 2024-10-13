import P5 from "p5"
import { Material } from "../../interfaces/material";
import { Modifiers } from "../modifiers";

export class Text extends Material {
    private graphics: P5.Graphics;

    constructor(
        p: P5,
        pos: P5.Vector,
        public title: string,
        public rainbowMode: boolean = false,
        private textSize = 50,
        modifiers = new Modifiers<Text>()
    ) {
        super(pos, modifiers)
        this.graphics = p.createGraphics(400,300);
        this.graphics.clear()
        this.graphics.textAlign(p.CENTER);
        this.graphics.textSize(this.textSize);
    }

    draw(p: P5): void {
        p.push()
        this.graphics.text(this.title, 100, 20, 200, 200);
        p.texture(this.graphics);
        p.plane(150,150)
        p.pop()
    }

    /** @todo */
    isInside(_: P5.Vector): boolean {
        return false;
    }

}