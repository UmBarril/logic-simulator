import P5 from "p5"
import { TextBox } from "./textbox"
import { MaterialGroup } from "../interfaces/materialgroup"

export class Menu extends MaterialGroup {
    //private textbox: TextBox
    private buttons: {label: string, y: number, textbox: TextBox} []

    constructor(
        p: P5,
        pos: P5.Vector,
    ) {
        super(pos)

        this.buttons = [
        { label: 'Continuar', y: 100, textbox: new TextBox(p, pos.copy().add(p.width, p.height), 'Continuar', 24)},
        { label: 'Novo Projeto', y: 160, textbox: new TextBox(p, pos.copy().add(-10, 190), 'Novo Projeto', 24)},
        { label: 'Carregar Projeto', y: 220, textbox: new TextBox(p, pos.copy().add(-30, 250), 'Carregar Projeto', 24)},
        { label: 'Lorem Ipsum', y: 280, textbox: new TextBox(p, pos.copy().add(-30, 310), 'Lorem Ipsum', 24)},
        { label: 'Sair', y: 340, textbox: new TextBox(p, pos.copy().add(27, 370), 'Sair', 24)}
        ]

        for(let button of this.buttons){
            this.addChild(button.textbox)
        }
    }

    draw(p: P5): void {
        //p.background(169, 169, 169)
        //p.fill(0)
        p.textSize(32)
        p.textAlign(p.CENTER)
        p.text('Projeto', p.width / 2, 50) // Título

        // Desenhar botões
        for (let button of this.buttons) {
            this.drawButton(button.y, p)
            button.textbox.draw(p)
        }
    }

    drawButton(y: number, p: P5) {
        const buttonWidth = 200
        const buttonHeight = 50
        const buttonX = this.pos.x - buttonWidth / 2
        const buttonY = this.pos.y + y

        // Cor
        p.fill(0, 0, 170)
        p.rect(buttonX, buttonY, buttonWidth, buttonHeight, 10) // Botão com bordas arredondadas
    }
    // Verifica se um clique ocorre dentro dos limites de um botão
    isInside(pos: P5.Vector): boolean {
        const buttonWidth = 200;
        const buttonHeight = 50;
        return (
            pos.x > this.pos.x &&
            pos.x < this.pos.x + buttonWidth &&
            pos.y > this.pos.y &&
            pos.y < this.pos.y + buttonHeight
        );
    }
    
}