import P5 from "p5"
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";

/**
 * baseado em https://editor.p5js.org/Tiri/sketches/LfGW4AjOz
 * @todo corrigir problemas 
 */
// export class TextInput extends Material {
//     constructor(
//         pos: P5.Vector,
//         private r1: number = 300,
//         private r2: number = 300,
//         private r3: number = 300,
//         private r4: number = 300,
//         private stroke: number = 300,
//         private defaultText: string = "Enter text here",
//         modifiers = new Modifiers<TextInput>()
//     ) {
//         super(pos, modifiers);
//     }

//     draw(p: P5) {
//         p.background(200);
//         textRegion(p, 300, height/2-ex, s+ex, ex, txt, s)
//     }

//     isInside(pos: P5.Vector): boolean {
//         throw new Error("Method not implemented.");
//     }

//     textRegion(p: P5, stroke, _text, _size){
//         var r3 = textWidth(join(_text,''))+ex;
//         p.strokeWeight(stroke);
//         p.fill(255);
//         p.rect(r1, r2, r3, r4);
//         p.fill(0);
//         p.textSize(_size);
//         p.text(p.join(_text,''),r1+stroke,r2+_size);
//         p.noFill();
//         p.rect(r1, r2, r3, r4);
//     }

//     keyPressed(){
//         i = txt.length;
//         txt[i] = key.toLowerCase();
//         if(txt.length > (width-(ex*2))/s){
//             txt.splice(0,1);
//         }
//     }
// }