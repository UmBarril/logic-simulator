import p5 from 'p5';

export class Toolbar {
    buttons: { label: string, x: number, y: number, w: number, h: number }[] = [];

    constructor() {
        this.createButtons();
    }

    createButtons() {
        const buttonWidth = 80;
        const buttonHeight = 30;
        const toolbarY = 20;  

        const labels = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];
        let startX = 20;

        labels.forEach((label) => {
            this.buttons.push({
                label: label,
                x: startX,
                y: toolbarY,
                w: buttonWidth,
                h: buttonHeight
            });
            startX += buttonWidth + 10;  
        });
    }

    draw(p: p5) {
        p.fill(211);  
        p.noStroke();
        p.rect(0, 0, p.width, 60);  

        this.buttons.forEach(button => {
            p.fill(255);  
            p.stroke(0);  
            p.rect(button.x, button.y, button.w, button.h);

            p.fill(0);  
            p.noStroke();
            p.textAlign(p.CENTER, p.CENTER);
            p.text(button.label, button.x + button.w / 2, button.y + button.h / 2);
        });
    }

    handleClick(mouseX: number, mouseY: number) {
        this.buttons.forEach(button => {
            if (mouseX > button.x && mouseX < button.x + button.w &&
                mouseY > button.y && mouseY < button.y + button.h) {
                console.log(`${button.label} button clicked`);
            }
        });
    }
}


const sketch = (p: p5) => {
    let toolbar: Toolbar;

    p.setup = () => {
        p.createCanvas(800, 600);
        toolbar = new Toolbar();
    };

    p.draw = () => {
        p.background(220);
        toolbar.draw(p);
    };

    p.mousePressed = () => {
        toolbar.handleClick(p.mouseX, p.mouseY);
    };
};

new p5(sketch);
