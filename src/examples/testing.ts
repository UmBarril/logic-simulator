import P5 from "p5"
import { Modifiers } from "../materials/modifiers"
import { Circle } from "../materials/shapes/circle"
import { randomPos } from "../util/util"
import { Workspace } from "../screens/workspace"
import { CircuitMaterial } from "../materials/circuits/circuitmaterial"
import { AndGate } from "../logic/basic-circuits/and"
import { OutputMaterial } from "../materials/circuits/ios/outputmaterial"
import { InputMaterial } from "../materials/circuits/ios/inputmaterial"

export class TestingWorkspace extends Workspace {

    constructor(
        p: P5,
    ) {
        super()

        let circle = new Circle(
            p.createVector(0, 0),
            30,
            [255, 0, 0],
            new Modifiers<Circle>().addOnClick((m) => {
                m.pos = randomPos(p)
                return false
            })
        )

        let om = new OutputMaterial(p, randomPos(p), "output", this.connectionManager)

        let im = new InputMaterial(p, randomPos(p), "input", this.connectionManager)

        let circuit = new AndGate()
        let cm = new CircuitMaterial(p, new P5.Vector(0,0), this.connectionManager, circuit)

        this.addChild(im)
        this.addChild(this.connectionManager) // transformar isso em this.add()
        this.addChild(om)
        this.addChild(circle)
        this.addChild(cm)
    }

}