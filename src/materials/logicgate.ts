import P5 from "p5";
import { Drawable } from "../interfaces/drawable";

export class LogicGate implements Drawable {
    _isDragging: boolean = false
    pos: P5.Vector
    dimensions: P5.Vector
    gateName: String

    constructor(p: P5, name: String, pos: P5.Vector, ){
        this.pos = pos
        this.dimensions = p.createVector(p.random(40, 80), p.random(40, 80))
        this.gateName = name
    }

    draw(p: P5){
        p.rect(this.pos.x, this.pos.y, this.dimensions.x, this.dimensions.y)
        
        p.textSize(32);
        p.fill(255);
        p.stroke(0);
        p.strokeWeight(4);

        p.text(this.gateName, this.pos.x, this.pos.y, this.dimensions.x, this.dimensions.y);
    }

    update(p: P5){
        // A posição do mouse é relativa ao canto superior esquerdo do canvas
        // enquanto a posição do retângulo é relativa ao canto superior esquerdo do retângulo
        let mouse = p.createVector(p.mouseX, p.mouseY)

        // Calcula a distância do mouse ao centro do retângulo
        let dis_x = Math.abs(mouse.x - (this.pos.x + (this.dimensions.x / 2)))
        let dis_y = Math.abs(mouse.y - (this.pos.y + (this.dimensions.y / 2)))

        if (!this._isDragging)  {
            let isInside = 
                dis_x < this.dimensions.x / 2 && 
                dis_y < this.dimensions.y / 2
            if (isInside && p.mouseIsPressed){
                this._isDragging = true
            }
        } else {
            if (!p.mouseIsPressed){
                this._isDragging = false
            }
            this.pos = mouse.add(p.createVector(-this.dimensions.x / 2, -this.dimensions.y / 2))
        }
    }}