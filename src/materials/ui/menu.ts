import P5 from "p5";
import { Material } from "../interfaces/material";
import { TextBox } from "./textbox";

export class Menu extends Material {
    private textbox: TextBox
    
    private readonly buttons = [
        { label: 'Continuar', y: 100 },
        { label: 'Novo Projeto', y: 160 },
        { label: 'Carregar Projeto', y: 220 },
        { label: 'Lorem Ipsum', y: 280 },
        { label: 'Sair', y: 340 },
    ];

    constructor(
        p: P5,
        pos: P5.Vector,
    ) {
        super(pos)
        this.textbox = new TextBox(p, pos, "aagragrarg")
        this.addChild(this.textbox) 
    }

    draw(p: P5): void {
        p.background(169, 169, 169); // Cor de fundo cinza
        p.fill(0); // Cor preta para o título
        p.textSize(32);
        p.textAlign(p.CENTER);
        p.text('Projeto', p.width / 2, 50); // Título

        // Desenhar botões
        for (let button of this.buttons) {
            this.drawButton(button.label, button.y, p);
        }
    }

    drawButton(label: string, y: number, p: P5) {
        const buttonWidth = 200;
        const buttonHeight = 50;

        // Cor do botão
        p.fill(0, 0, 139); // Azul escuro
        p.rect(this.pos.x, this.pos.y + y, buttonWidth, buttonHeight, 10); // Botão com bordas arredondadas

        // Texto do botão
        p.fill(255); // Texto branco
        p.textSize(24);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(label, this.pos.x, this.pos.y + buttonHeight / 2); // Centraliza o texto no botão
    }

    isInside(pos: P5.Vector): boolean {
        return false;
    }
}