import P5 from 'p5'
import { Drawable } from '../interfaces/drawable'

// canvas tem que estar no modo webgl para isso funcionar
export class CoolSpiningText implements Drawable {
    pos: P5.Vector;
    _text: String;

    constructor(p: P5, text: String, pos: P5.Vector){
        this.pos = pos
        this._text = text
    }

    setText(text: String){
        this._text = text
    }

    draw(p: P5){
        // let font = p.loadFont('/assets/inconsolata.otf');
        // p.textFont(font);


        p.textSize(32);
        p.stroke(0);
        // p.strokeWeight(4);
        p.textSize(32);
        // p.textAlign(p.CENTER, p.CENTER); 
        p.rotateY(p.frameCount / 30);

        p.text(this._text, this.pos.x, this.pos.y);
    }

    update(p: P5) { }
}