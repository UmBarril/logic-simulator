import P5 from "p5"
import { TextBox } from "./textbox"
import { MaterialGroup } from "../interfaces/materialgroup"

export class Menu extends MaterialGroup {
    //private textbox: TextBox
    private buttons: {label: string, y: number, textbox: TextBox} []
    
    /* private readonly buttons = [
        { label: 'Continuar', y: 100, textbox: new TextBox(p, pos.copy().add(0, 100), "Continuar", 24)},
        { label: 'Novo Projeto', y: 160 },
        { label: 'Carregar Projeto', y: 220 },
        { label: 'Lorem Ipsum', y: 280 },
        { label: 'Sair', y: 340 },
    ] */

    constructor(
        p: P5,
        pos: P5.Vector,
    ) {
        super(pos)
        this.buttons = [
        { label: 'Continuar', y: 100, textbox: new TextBox(p, pos.copy().add(0, 100), "Continuar", 24)},
        { label: 'Novo Projeto', y: 160, textbox: new TextBox(p, pos.copy().add(0, 160), "Novo Projeto", 24) },
        { label: 'Carregar Projeto', y: 220, textbox: new TextBox(p, pos.copy().add(0, 220), "Lorem Ipsum", 24) },
        { label: 'Lorem Ipsum', y: 280, textbox: new TextBox(p, pos.copy().add(0, 280), 'Lorem Ipsum', 24) },
        { label: 'Sair', y: 340, textbox: new TextBox(p, pos.copy().add(0, 340), 'Sair', 24) }
        ]

        for(let button of this.buttons){
            this.addChild(button.textbox)
        }
    }

    draw(p: P5): void {
        p.background(169, 169, 169)
        p.fill(0)
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

        // Cor
        p.fill(0, 0, 139)
        p.rect(this.pos.x, this.pos.y + y, buttonWidth, buttonHeight, 10) // Botão com bordas arredondadas

        // Texto corretamente desenhado no centro dos botões
        p.fill(255);
        p.textSize(24);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("Texto do Botão", this.pos.x + buttonWidth / 2, this.pos.y + y + buttonHeight / 2);
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