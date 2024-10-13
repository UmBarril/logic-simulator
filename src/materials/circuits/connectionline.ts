import P5 from "p5";
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";
import { IOMaterial } from "./iomaterial";
import { ConnectionManager } from "./connectionmgr";
import { getMousePos } from "../../util/util";

export class ConnectionLine extends Material {

    private readonly enabledColor = [255, 0, 0]
    private readonly disabledColor = [255, 255, 0]

    private readonly width = 10

    private io1: IOMaterial
    private io2: IOMaterial | null = null

    private state: boolean

    constructor(
        private connectionManager: ConnectionManager,
        private origin: IOMaterial,
        initialState: boolean,
        modifiers: Modifiers<ConnectionLine> = new Modifiers()
    ) { 
        super(
            new P5.Vector(0,0),
            modifiers.addOnClick((self, pos) => {
                console.log("clicked on line")
                // this.color = p.color(p.random(255), p.random(255), p.random(255))
                return true;
            })
            .addZIndex(1)
        )
        this.io1 = origin
        this.state = initialState
    }

    draw(p: P5): void {
        p.push()
            p.translate(0,0,this.modifiers.zIndex)

            if (this.state) {
                p.stroke(p.color(this.enabledColor))
            } else {
                p.stroke(p.color(this.disabledColor))
            }
            p.strokeWeight(this.width)

            let io1Pos = this.io1.getConnectionPointPos()
            // ainda não está conectado com outro io, mover segundo o mouse
            if (this.io2 == null) {
                let mouse = getMousePos(p)
                p.line(io1Pos.x, io1Pos.y, mouse.x, mouse.y)
            } else {
                let io2Pos = this.io2.getConnectionPointPos()
                p.line(io1Pos.x, io1Pos.y, io2Pos.x, io2Pos.y)
            }
        p.pop()
    }

    isInside(pos: P5.Vector): boolean {
        let start = this.io1.getConnectionPointPos()
        let end = this.io2?.getConnectionPointPos()
        if (end == null) {
            return false
        }
        return pos.dist(start) + pos.dist(end) <= start.dist(end) + this.width;
    }

}