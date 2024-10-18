import P5 from "p5";
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";
import { getMousePos } from "../../util/util";

export class Rectangle extends Material {
    private _dragging = false

    constructor(
        pos: P5.Vector,
        private dimensions: P5.Vector,
        private color: P5.Color,
        modifiers: Modifiers<Rectangle> = new Modifiers()
    ){
        super(pos, modifiers)
    }

    draw(p: P5){
        p.push()
        p.scale(this.scale)
        p.translate(0,0,this.realPos.z)
        if (this._dragging && this.modifiers.onMousePressed != null){
            this.modifiers.onMousePressed(this, getMousePos(p))
        }

        p.fill(255, 255,0)
        p.color(this.color)
        p.rect(this.pointOfOrigin.x + this.pos.x, this.pointOfOrigin.y + this.pos.y, this.dimensions.x, this.dimensions.y)
        p.pop()
    }

    setColor(color: P5.Color){
        this.color = color
    }

    setDimensions(width: number, height: number){
        this.dimensions = new P5.Vector(width, height)
    }

    public set height(height: number){
        this.dimensions.y = height
    }

    public set width(width: number){
        this.dimensions.x = width
    }

    override isInside(pos: P5.Vector): boolean { 
        let rectMiddle = this.realPos.copy().add(this.dimensions.copy().div(2))
        let dis_x = Math.abs(pos.x - rectMiddle.x)
        let dis_y = Math.abs(pos.y - rectMiddle.y)
        return dis_x < this.dimensions.x / 2 && dis_y < this.dimensions.y / 2 
    }
}