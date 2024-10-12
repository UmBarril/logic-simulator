import P5 from "p5";
import { Drawable } from "../../interfaces/drawable";

export class RotatingTitle implements Drawable {

    private graphics: P5.Graphics;

    constructor(
        p: P5, 
        public pos: P5.Vector,
        public title: string,
        public rainbowMode: boolean = false,
        private textSize = 50
    ) {
        this.graphics = p.createGraphics(400,300);
        this.graphics.clear()
        this.graphics.textAlign(p.CENTER);
        this.graphics.textSize(this.textSize);
    }

    draw(p: P5): void {
        p.push()

        p.translate(this.pos); 
        p.strokeWeight(0)
        p.rotateY(p.frameCount * 0.01);

        if (this.rainbowMode) {
            // todo: fazer ele não ir para o 0 (se não fica invisivel)
            let r = Math.abs((p.frameCount) % 510 - 255) // 255 -> 0 -> 255
            let g = Math.abs((p.frameCount + 100) % 510 - 255)
            let b = Math.abs((p.frameCount + 180) % 510 - 255)
            this.graphics.fill(r, g, b)
        } else {
            this.graphics.fill(0);
        }

        // todo: remover esse tamanho hardcoded
        this.graphics.text(this.title, 100, 20, 200, 200);
        p.texture(this.graphics);
        p.plane(150,150);

        p.pop()
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }
}