import P5 from "p5";
import { Drawable } from "../interfaces/drawable";
import { Circuit } from "../../logic/circuit";
import { Directions } from "../../util/direction";

export class CircuitMaterial implements Drawable {
    private _isDragging: boolean = false
    private dimensions: P5.Vector
    private direction: Directions = Directions.RIGHT

    constructor(
        p: P5, 
        private pos: P5.Vector,
        private circuit: Circuit
    ) {
        this.pos = pos
        this.dimensions = p.createVector(p.random(40, 80), p.random(40, 80))
    }

    draw(p: P5){
        p.push()

        p.rect(this.pos.x, this.pos.y, this.dimensions.x, this.dimensions.y)

        // if (this.directions == Directions.RIGHT) {
            p.push()
            p.fill(0, 255, 0)
            this.circuit.getInputs().forEach(input => {
                p.ellipse(this.pos.x, this.pos.y + 5, 10, 10)
            })
            p.pop()

        p.pop()
        
        // p.textSize(32);
        // p.fill(255);
        // p.stroke(0);
        // p.strokeWeight(4);

        // p.text(this.gateName, this.pos.x, this.pos.y, this.dimensions.x, this.dimensions.y);
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