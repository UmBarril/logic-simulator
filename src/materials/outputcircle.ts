import P5 from "p5";
import { Drawable } from "../interfaces/drawable";
import { Clickable } from "../interfaces/clickable";
import { Directions } from "../direction";
import { canvaPosToWebglPos } from "../util/util";

/**
 * Essa classe representa um botão de saída de um circuito lógico.
 * O botão pode ser clicado e arrastado para criar uma linha.
 */
export class OutputButton implements Drawable, Clickable {
    private currentDirection: Directions = Directions.UP;
    isDraggingLine: boolean = false;
    isEnabled: boolean = false;

    readonly buttonRad = 20;
    readonly bridgeWidth = 10;

    // pad distance from the button
    readonly padDistance = 20;
    // pad side size
    readonly padSize = 20;

    pos: P5.Vector;
    padPos: P5.Vector | null = null;

    constructor(pos: P5.Vector) {
        this.pos = pos;
        // Direção padrão
        // this.changeDirection(Directions.UP)
    }

    changeDirection(direction: Directions) {
        this.currentDirection = direction
        switch (this.currentDirection){
            case Directions.UP:
                let x = this.pos.x - (this.buttonRad / 2)

                // this.padPos = new P5.Vector(this.pos.x = , )

                break
            case Directions.RIGHT:
                break;
            case Directions.DOWN:
                break;
            case Directions.LEFT:
                break;
        }
    }

    click(p: P5, pos: P5.Vector): void {
        // Botão de ligar e desligar
        let dis = P5.Vector.dist(this.pos, pos);
        console.log("x = " + pos.x + " y = " + pos.y);
        console.log(dis);
        if (dis < this.buttonRad) {
           this.isEnabled = !this.isEnabled ;
           console.log("foi");
        } 

        // Pad de conexão TODO
        // if (dis < this.connectorRad) {
        //     this.isDraggingLine = !this.isDraggingLine;
        //     return
        // } else if (this.isDraggingLine){
        //     this.isDraggingLine = false;
        // }
    }

    draw(p: P5){
        // Pad de conexão 
        let bridgeX: number
        let bridgeY: number
        switch (this.currentDirection){
            case Directions.UP:
                bridgeX = this.pos.x - this.bridgeWidth / 2;
                // 5 é um numero árbitrario para fazer o retângulo passar por debaixo do botão
                bridgeY = this.pos.y - this.buttonRad - this.padDistance + 5;

                // Ponte entre o botão e o pad de conexão
                p.fill(255, 5, 100) // rosa
                p.noStroke()
                // p.stroke(255, 5, 100)
                // p.strokeWeight(10)
                // p.line(this.pos.x, this.pos.y, bridgeX - ((this.padSize - this.bridgeWidth) / 2), bridgeY - this.padSize)
                p.rect(bridgeX, bridgeY, this.bridgeWidth, this.padDistance)

                // O próprio pad de conexão
                p.stroke(0)
                p.fill(255, 255, 255) // branco
                p.rect(bridgeX - ((this.padSize - this.bridgeWidth) / 2), bridgeY - this.padSize, this.padSize, this.padSize)

                break
            case Directions.RIGHT:
                bridgeX = this.pos.x - this.bridgeWidth / 2;
                // 5 é um numero árbitrario para fazer o retângulo passar por debaixo do botão
                bridgeY = this.pos.y - this.buttonRad - this.padDistance + 5;

                // Ponte entre o botão e o pad de conexão
                p.fill(255, 5, 100) // rosa
                p.noStroke()
                p.rect(bridgeX, bridgeY, this.bridgeWidth, this.padDistance)

                // O próprio pad de conexão
                p.stroke(0)
                p.fill(255, 255, 255) // branco
                p.rect(bridgeX - ((this.padSize - this.bridgeWidth) / 2), bridgeY - this.padSize, this.padSize, this.padSize)
                break;
            case Directions.DOWN:
                bridgeX = this.pos.x - this.bridgeWidth / 2;
                // 5 é um numero árbitrario para fazer o retângulo passar por debaixo do botão
                bridgeY = this.pos.y - this.buttonRad - this.padDistance + 5;

                // Ponte entre o botão e o pad de conexão
                p.fill(255, 5, 100) // rosa
                p.noStroke()
                p.rect(bridgeX, bridgeY, this.bridgeWidth, this.padDistance)

                // O próprio pad de conexão
                p.stroke(0)
                p.fill(255, 255, 255) // branco
                p.rect(bridgeX - ((this.padSize - this.bridgeWidth) / 2), bridgeY - this.padSize, this.padSize, this.padSize)
                break;
            case Directions.LEFT:
                bridgeX = this.pos.x - this.bridgeWidth / 2;
                // 5 é um numero árbitrario para fazer o retângulo passar por debaixo do botão
                bridgeY = this.pos.y - this.buttonRad - this.padDistance + 5;

                p.rect(bridgeX, bridgeY, this.bridgeWidth, this.padDistance)

                p.rect(bridgeX - ((this.padSize - this.bridgeWidth) / 2), bridgeY - this.padSize, this.padSize, this.padSize)
                break;
        }

        // Botão de ligar e desligar  
        if (this.isEnabled){
            p.fill(255, 255, 0)
        } else {  
            p.fill(255, 0, 255)
        }
        p.ellipse(this.pos.x, this.pos.y, this.buttonRad*2)

        // p.color(255, 255, 255)
        // p.ellipse(this.pos.x, this.pos.y, this.buttonRad*1.5)
        

        // Linha (caso esteja sendo arrastada)
        if (this.isDraggingLine){
            p.stroke(255)
            p.strokeWeight(10)

            let realPos = canvaPosToWebglPos(p, p.mouseX, p.mouseY)
            p.line(this.pos.x, this.pos.y, realPos.x, realPos.y)
        }
    }
}