import P5 from "p5";
import { MaterialGroup } from "../materials/interfaces/materialgroup";
import { RotatingTitle } from "../materials/ui/rotatingtitle";

export class UI extends MaterialGroup {
    windowResized(p: P5) {
        throw new Error("Method not implemented.");
    }

    constructor(p: P5) {
        super(new P5.Vector(0, 0))

        let title = 'logic simulator v0.1'
        let titleMaterial = new RotatingTitle(
            p, 
            p.createVector(-p.width / 2 + 85, -p.height / 2 + 100), // posição
            title, // texto
            true // rainbowMode
        )

        this.addChild(titleMaterial)
    }
}