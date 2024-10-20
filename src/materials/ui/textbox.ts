import P5 from "p5"
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";

// TODO: FAZER ISSO FUNCIONAR PROPRIAMENTE
export class TextBox extends Material {
    private graphics: P5.Graphics;

    constructor(
        p: P5,
        pos: P5.Vector,
        private _title: string,
        pxTextSize = 40,  // em pixel
        //private color: P5.Color,
        modifiers = new Modifiers<TextBox>()
    ) {
        super(pos, modifiers)

        this.graphics = p.createGraphics(400,150);
        this.graphics.clear()
        this.graphics.textSize(pxTextSize);
    }

    draw(p: P5): void {
        const width = p.textWidth(this._title) + 100  // todo: remover esse tamanho e altura hardcoded (altura hardcoded removida?)
        const height = this.graphics.height - 50
        p.push()
        p.translate(P5.Vector.add(this.pos, this.pointOfOrigin));
        //p.fill(this.color)

        p.strokeWeight(0) // descomentar isso quando não estiver debugando
        /* this.graphics.rectMode(p.CENTER);
        this.graphics.textAlign(p.CENTER, p.CENTER); */
        this.graphics.fill(255)
        this.graphics.text(this._title, 0, height / 2, width + 200, height + 200);
        p.texture(this.graphics);
        p.plane(this.graphics.width, this.graphics.height)

        p.pop()
    }

    setColor(color: P5.Color){
        //this.color = color
    }

    /** @todo */
    isInside(_: P5.Vector): boolean {
        return false;
    }

}