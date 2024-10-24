import P5 from "p5";
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";

export class Circle extends Material {
    

    constructor(
        pos: P5.Vector,
        private rad: number = 20,
        private color: number[], // eu quero por uma cor padrão.. mas eu preciso de um p5 para isso
        modifiers: Modifiers<Circle> = new Modifiers()
    ){
        super(pos, modifiers)
    }

    draw(p: P5){
        p.push()
        p.translate(0,0,this.realPos.z)
        p.fill(p.color(this.color))
        p.ellipse(this.realPos.x, this.realPos.y, this.rad*2)
        p.pop()
    }

    setColor(color: number[]){
        this.color = color
    }

    override isInside(pos: P5.Vector): boolean { 
        let dis = P5.Vector.dist(this.realPos, pos)
        return dis < this.rad 
    }
}