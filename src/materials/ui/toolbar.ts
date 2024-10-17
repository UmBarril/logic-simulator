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
        p.fill(100, 150, 255);  
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
                // Aqui você pode disparar um evento ou chamar uma função específica
                this.handleButtonAction(button.label);
            }
        });
    }

    private isMouseOverButton(mouseX: number, mouseY: number, button: Button): boolean {
        return mouseX > button.x && mouseX < button.x + button.w &&
               mouseY > button.y && mouseY < button.y + button.h;
    }

    private handleButtonAction(label: string) {
        // Ações a serem realizadas quando um botão é clicado
        // Por exemplo, você pode chamar um método na CircuitModelingScreen
        console.log(`Ação para o botão ${label}`);
        // Aqui você pode implementar a lógica específica para cada botão
    }
}