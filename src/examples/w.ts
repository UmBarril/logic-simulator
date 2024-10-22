import P5 from "p5"
import { Workspace } from "../screens/workspace"
import { EditableCircuit } from "../logic/editablecircuit"
import { ConnectionManager } from "../materials/circuits/connectionmgr"
import { OutputMaterial } from "../materials/circuits/ios/outputmaterial"
import { randomPos } from "../util/util"
import { InputMaterial } from "../materials/circuits/ios/inputmaterial"
import { AndGate } from "../logic/gates/and"
import { CircuitMaterial } from "../materials/circuits/circuitmaterial"
import { NotGate } from "../logic/gates/not"

export class WTestingWorkspace extends Workspace {

    constructor(p: P5) {
        let circuit = new EditableCircuit()
        let connectionManager = new ConnectionManager(circuit)

        super(connectionManager)

        this.addOutput(p, "output")
        this.addInput(p, "input")
        this.addInput(p, "input2")
        this.addAndGate(p)
        this.addNotGate(p)
    }

    addOutput(p: P5, name: string) {
        this.verifyCircuitExists()
        if (this.connectionManager.getCircuit().checkOutputExists(name)) {
            throw new Error("Input already exists")
        }
        this.connectionManager.getCircuit().addOutput(name)
        let o = new OutputMaterial(p, randomPos(p), name, this.connectionManager)

        this.addChild(o)
    }

    addInput(p: P5, name: string) {
        this.verifyCircuitExists()
        if (this.connectionManager.getCircuit().checkInputExists(name)) {
            throw new Error("Input already exists")
        }
        this.connectionManager.getCircuit().addInput(name)
        let i = new InputMaterial(p, randomPos(p), name, this.connectionManager)

        this.addChild(i)
    }

    addAndGate(p: P5) {
        this.verifyCircuitExists()
        let and = new AndGate()
        let cm = new CircuitMaterial(p, randomPos(p), this.connectionManager, and)

        this.addChild(cm)
    }

    addNotGate(p: P5) {
        this.verifyCircuitExists()
        let and = new NotGate()
        let cm = new CircuitMaterial(p, randomPos(p), this.connectionManager, and)

        this.addChild(cm)
    }

    verifyCircuitExists() {
        // NAO GOSTO DE TER QUE ACESSAR O CIRCUIT DIRETAMENTE, MAS ESTOU SEM TEMPO
        if (this.connectionManager.getCircuit() == undefined) {
            throw new Error("Circuit not defined")
        }
    }
}