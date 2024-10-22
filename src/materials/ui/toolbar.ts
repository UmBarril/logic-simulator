import P5 from 'p5';
import { MaterialGroup } from '../interfaces/materialgroup';
/**
 * Interface que representa um botão na Toolbar.
 */
interface Button {
    label: string;
    x: number;
    y: number;
    w: number;
    h: number;
    isHovered?: boolean; // Propriedade para verificar se o botão está sendo destacado
    color: [number, number, number]; // Cor original do botão
}

/**
 * Classe que representa a Toolbar.
 */
export class Toolbar extends MaterialGroup  {
    private buttons: Button[] = [];
    private buttonWidth: number = 80;
    private buttonHeight: number = 30;
    private toolbarY: number = 540;  
    private buttonSpacing: number = 10;

    constructor(p: P5, pos: P5.Vector) {
        super(pos);

        this.createButtons();
        
    }

    private createButtons() {
        const labels = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];
        const colors: [number, number, number][] = [
            [255, 0, 0], // Vermelho
            [0, 255, 0], // Verde
            [0, 0, 255], // Azul
            [255, 255, 0], // Amarelo
            [255, 165, 0], // Laranja
            [128, 0, 128], // Roxo
            [0, 255, 255]  // Ciano
        ];
        let startX = 20;

        labels.forEach((label, index) => {
            this.buttons.push(this.createButton(label, startX, this.toolbarY, colors[index]));
            startX += this.buttonWidth + this.buttonSpacing;  
        });
    }

    private createButton(label: string, x: number, y: number, color: [number, number, number]): Button {
        return { label, x, y, w: this.buttonWidth, h: this.buttonHeight, color };
    }

    public draw(p: P5) {
        this.drawToolbarBackground(p);
        this.buttons.forEach(button => this.drawButton(p, button));
    }

    private drawToolbarBackground(p: P5) {
        p.fill(211);  
        p.noStroke();
        p.rect(0, p.height - 60, p.width, 60);  
    }

    private drawButton(p: P5, button: Button) {
        // Muda a cor do botão se o mouse estiver sobre ele
        const gradientColor = button.isHovered ? this.getGradientColor(button.color) : button.color;
        p.fill(...gradientColor);  
        p.stroke(0);  
        p.rect(button.x, button.y, button.w, button.h, 10); // Bordas arredondadas

        p.fill(0);  
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.text(button.label, button.x + button.w / 2, button.y + button.h / 2);
    }

    private getGradientColor(originalColor: [number, number, number]): [number, number, number] {
        // Exemplo de animação de gradiente simples
        return [originalColor[0] + 50, originalColor[1] + 50, originalColor[2] + 50];
    }

    public mouseMoved(p: P5) {
        this.buttons.forEach(button => {
            button.isHovered = p.mouseX > button.x && p.mouseX < button.x + button.w &&
                               p.mouseY > button.y && p.mouseY < button.y + button.h;
        });
    }
}