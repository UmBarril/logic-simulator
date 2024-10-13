import P5 from "p5"
import { Modifiers } from "../materials/modifiers"
import { Circle } from "../materials/shapes/circle"
import { randomPos } from "../util/util"
import { Material } from "../materials/interfaces/material"
import { Workspace } from "../workspace"
import { IOMaterial } from "../materials/circuits/iomaterial"
import { ConnectionManager } from "../materials/circuits/connectionmgr"

export class TestingWorkspace implements Workspace {

    getMaterials(p: P5) {
        let materials: Material[] = []

        let circle = new Circle(
            p.createVector(0, 0),
            30,
            p.color(255, 0, 0),
            new Modifiers<Circle>().addOnClick((m) => {
                m.pos = randomPos(p)
                return false
            })
        )

        let connectionManager = new ConnectionManager()
        let om = new IOMaterial(p, randomPos(p), connectionManager)

        materials.push(connectionManager)
        materials.push(om)
        materials.push(circle)

        return materials
    }

}