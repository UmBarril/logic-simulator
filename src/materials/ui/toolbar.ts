import P5 from 'p5';

/**
 * Interface que representa um botão na Toolbar.
 */
interface Button {
    label: string;
    x: number;
    y: number;
    w: number;
    h: number;
    isHovered?: boolean; // Adiciona propriedade para verificar se o botão está sendo destacado
}

/**
 * Classe que representa a Toolbar.
 */
export class Toolbar {
    private buttons: Button[] = [];
    private buttonWidth: number = 80;
    private buttonHeight: number = 30;
    private toolbarY: number = 540;  
    private buttonSpacing: number = 10;

    constructor() {
        this.createButtons();
    }

    private createButtons() {
        const labels = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];
        let startX = 20;

        labels.forEach((label) => {
            this.buttons.push(this.createButton(label, startX, this.toolbarY));
            startX += this.buttonWidth + this.buttonSpacing;  
        });
    }

    private createButton(label: string, x: number, y: number): Button {
        return { label, x, y, w: this.buttonWidth, h: this.buttonHeight };
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
        p.fill(button.isHovered ? [150, 200, 255] : [100, 150, 255]);  
        p.stroke(0);  
        p.rect(button.x, button.y, button.w, button.h);

        p.fill(0);  
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.text(button.label, button.x + button.w / 2, button.y + button.h / 2);
    }

    public handleClick(mouseX: number, mouseY: number) {
        this.buttons.forEach(button => {
            if (this.isMouseOverButton(mouseX, mouseY, button)) {
                console.log(`${button.label} button clicked`);
                this.handleButtonAction(button.label);
            }
        });
    }

    public handleMouseMove(mouseX: number, mouseY: number) {
        this.buttons.forEach(button => {
            button.isHovered = this.isMouseOverButton(mouseX, mouseY, button);
        });
    }

    private isMouseOverButton(mouseX: number, mouseY: number, button: Button): boolean {
        return mouseX > button.x && mouseX < button.x + button.w &&
               mouseY > button.y && mouseY < button.y + button.h;
    }

    private handleButtonAction(label: string) {
        // Ações a serem realizadas quando um botão é clicado
        console.log(`Ação para o botão ${label}`);
        // Implementar a lógica específica para cada botão aqui
    }
}