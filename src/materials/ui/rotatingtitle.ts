import P5 from "p5";
import { Material } from "../interfaces/material";

export class RotatingTitle extends Material {
    private graphics: P5.Graphics;
    width = 200
    height = 200

    constructor(
        p: P5, 
        pos: P5.Vector,
        public _title: string,
        public rainbowMode: boolean = false,
        private textSize = 50
    ) {
        super(pos)
        this.graphics = p.createGraphics(this.width * this.scale, this.height * this.scale);
        this.graphics.clear()
        this.graphics.textAlign(p.CENTER);
    }

    draw(p: P5): void {

        let scaledWidth = this.width * this.scale
        let scaledHeight = this.height * this.scale

        p.push()

        p.translate(P5.Vector.add(this.pos, this.pointOfOrigin)); 
        // p.scale(this.scale)
        // p.strokeWeight(0)

        // lógica para inverter o texto quando ele estiver do lado errado
        let rot = p.frameCount * 0.01 
        p.rotateY((rot % p.PI) - (p.PI / 2));

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
        this.graphics.textAlign(p.CENTER, p.CENTER);
        this.graphics.textSize(this.textSize * this.scale);
        this.graphics.text(this._title, 0, 0, scaledWidth, scaledHeight);

        p.texture(this.graphics);

        p.plane(scaledWidth, scaledHeight)

        p.pop()
    }

    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    isInside(_: P5.Vector): boolean {
        return false
    }

}