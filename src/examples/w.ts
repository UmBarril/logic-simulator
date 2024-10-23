import P5 from "p5"
import { Workspace } from "../screens/workspace"
import { EditableCircuit } from "../logic/editablecircuit"
import { ConnectionManager } from "../materials/circuits/connectionmgr"
import { AndGate } from "../logic/gates/and"
import { NotGate } from "../logic/gates/not"
import { OrGate } from "../logic/gates/or"

export class WTestingWorkspace extends Workspace {

    constructor(p: P5) {
        let circuit = new EditableCircuit()
        let connectionManager = new ConnectionManager(p, circuit)

        super(connectionManager)

        this.addOutput(p, "output")
        this.addInput(p, "input")
        this.addInput(p, "input2")
        this.addGate(p, new AndGate())
        this.addGate(p, new NotGate())
        this.addGate(p, new OrGate())
    }

}