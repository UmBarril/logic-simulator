import P5 from "p5"
import { Modifiers } from "../materials/modifiers"
import { Circle } from "../materials/shapes/circle"
import { randomPos } from "../util/util"
import { Material } from "../materials/interfaces/material"
import { Workspace } from "../screens/workspace"
import { IOMaterial } from "../materials/circuits/iomaterial"
import { ConnectionManager } from "../materials/circuits/connectionmgr"

export class TestingWorkspace extends Workspace {

    constructor(
        p: P5,
    ) {
        super()

        let circle = new Circle(
            p.createVector(0, 0),
            30,
            p.color(255, 0, 0),
            new Modifiers<Circle>().addOnClick((m) => {
                m.pos = randomPos(p)
                return false
            })
        )

        let om = new IOMaterial(p, randomPos(p), this.connectionManager)

        this.addChild(this.connectionManager) // transformar isso em this.add()
        this.addChild(om)
        this.addChild(circle)
    }

}