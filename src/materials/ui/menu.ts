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
        { label: 'Continuar', y: 100, textbox: new TextBox(p, pos.copy().add(0, 0), 'Continuar', 24)},
        { label: 'Novo Projeto', y: 160, textbox: new TextBox(p, pos.copy().add(0, 0), 'Novo Projeto', 24)},
        { label: 'Carregar Projeto', y: 220, textbox: new TextBox(p, pos.copy().add(0, 0), 'Carregar Projeto', 24)},
        { label: 'Lorem Ipsum', y: 280, textbox: new TextBox(p, pos.copy().add(0, 0), 'Lorem Ipsum', 24)},
        { label: 'Sair', y: 340, textbox: new TextBox(p, pos.copy().add(0, 0), 'Sair', 24)}
        ]

        for(let button of this.buttons){
            this.addChild(button.textbox)
        }
    }

    draw(p: P5): void {
        // Desenhar botões
        for (let button of this.buttons) {
            this.drawButton(button, p)
        }
    }

    drawButton(button: {label: string, y: number, textbox: TextBox}, p: P5) {
        const buttonWidth = 200
        const buttonHeight = 50
        const buttonX = this.pos.x
        const buttonY = this.pos.y + button.y

        // Cor
        p.fill(0, 0, 170)
        p.rect(buttonX, buttonY, buttonWidth, buttonHeight, 10) // Botão com bordas arredondadas

        button.textbox.pos = this.pos.copy().add(435, button.y + 40)
        button.textbox.draw(p)
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