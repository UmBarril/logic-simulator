import P5 from "p5"
import { Modifiers } from "../materials/modifiers"
import { Circle } from "../materials/shapes/circle"
import { randomPos } from "../util/util"
import { Material } from "../materials/interfaces/material"
import { Workspace } from "../workspace"
import { IOMaterial } from "../materials/circuits/iomaterial"
import { ConnectionManager } from "../materials/circuits/connectionmgr"
import { Menu } from "../materials/ui/Menu"

export class TestingWorkspace implements Workspace {

    getMaterials(p: P5) {
        let materials: Material[] = []

        let menu = new Menu(p, p.createVector(-100, -300))

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
        materials.push(menu)

        return materials
    }

}