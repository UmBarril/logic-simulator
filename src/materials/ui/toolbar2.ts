import P5 from "p5"
import { MaterialGroup } from "../interfaces/materialgroup";
import { Rectangle } from "../shapes/rectangle";
import { Modifiers } from "../modifiers";
import { TextBox } from "./textbox";
import { AndGate } from "../../logic/gates/and";
import { OrGate } from "../../logic/gates/or";
import { NotGate } from "../../logic/gates/not";
import { NorGate } from "../../logic/gates/nor";
import { XorGate } from "../../logic/gates/xor";
import { XnorGate } from "../../logic/gates/xnor";
import { NandGate } from "../../logic/gates/nand";
import { Workspace } from "../../screens/workspace";

export class ToolBar2 extends MaterialGroup {

    private buttonWidth: number = 80;
    private buttonHeight: number = 30;
    private buttonSpacing: number = 10;

    private buttons: Button[] = []

    constructor(
        p: P5, 
        workspace: Workspace
    ) {
        super(new P5.Vector(0, 0));
    
        let toolbarHeight = 60
        let toolbarWidth = p.width

        let toolbarX = -p.width / 2;  
        let toolbarY = p.height / 2 - toolbarHeight;  

        let background = new Rectangle(
            new P5.Vector(toolbarX, toolbarY),
            new P5.Vector(toolbarWidth, toolbarHeight), 
            p.color(211, 211, 211)
        );
        this.addChild(background);

        // TODO: adicionar inputs e outputs
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
        const functions = [
            () => workspace.addGate(p, new AndGate()), 
            () => workspace.addGate(p, new OrGate()), 
            () => workspace.addGate(p, new NotGate()), 
            () => workspace.addGate(p, new NandGate()), 
            () => workspace.addGate(p, new NorGate()), 
            () => workspace.addGate(p, new XorGate()), 
            () => workspace.addGate(p, new XnorGate()), 
        ]
        
        for (let i = 0; i < labels.length; i++) {
            let button = new Button(
                p,
                new P5.Vector(-p.width / 2 + this.buttonSpacing + (this.buttonWidth + this.buttonSpacing) * i, toolbarY),
                labels[i],
                colors[i],
                this.buttonWidth,
                this.buttonHeight,
                () => {
                    console.log(labels[i]);
                    workspace.addGate(p, new AndGate())
                    functions[i]();
                    return true
                },
                false
            );
            this.addChild(button);
            this.buttons.push(button);
        }
    }

    mouseMoved(p: P5) {
        this.buttons.forEach(button => {
            button.setIsHovered(button.isInside(p.createVector(p.mouseX, p.mouseY)));
        })
    }
}

class Button extends MaterialGroup {

    constructor(
        p: P5,
        pos: P5.Vector,
        label: string,
        private color: [number, number, number],
        private width: number,
        private height: number,
        onClick: () => boolean,
        private isHovered: boolean
    ) {
        super(pos, new Modifiers<MaterialGroup>().addOnClick(onClick));

        console.log("ä" )
        let text = new TextBox(p, pos.copy().add(0,0), label, 24);
        this.addChild(text)
    }

    setIsHovered(isHovered: boolean) {
        this.isHovered = isHovered;
    }

    draw(p: P5 | P5.Graphics): void {
        p.push();
            // Muda a cor do botão se o mouse estiver sobre ele
            const gradientColor = this.isHovered ? this.getGradientColor(this.color) : this.color;
            p.fill(...gradientColor);  
            p.stroke(0);  
            p.rect(this.pos.x, this.pos.y, this.width, this.height, 10); // Bordas arredondadas

        p.pop();
    }

    private getGradientColor(originalColor: [number, number, number]): [number, number, number] {
        // Exemplo de animação de gradiente simples
        return [originalColor[0] + 50, originalColor[1] + 50, originalColor[2] + 50];
    }

    isInside(pos: P5.Vector): boolean {
        let rectMiddle = this.realPos.copy().add(this.width / 2, this.height / 2)
        let dis_x = Math.abs(pos.x - rectMiddle.x)
        let dis_y = Math.abs(pos.y - rectMiddle.y)
        return dis_x < this.width / 2 && dis_y < this.height / 2 
    }

}