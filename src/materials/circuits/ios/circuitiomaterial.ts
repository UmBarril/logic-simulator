import P5 from 'p5'
import { Modifiers } from "../../modifiers";
import { Circle } from "../../shapes/circle";
import { ConnectionManager } from '../connectionmgr';
import { ConnectionPoint } from '../connectionpoint';
import { Circuit } from '../../../logic/circuit';

export abstract class CircuitIOMaterial extends Circle implements ConnectionPoint {

    private _parentCircuit: Circuit

    private _connectedConnectionPoint: ConnectionPoint | null = null

    protected constructor(
        private name: string,
        protected connectionManager: ConnectionManager,
        position: P5.Vector,
        circuit: Circuit,
        radius: number = 30,
        modifier: Modifiers<Circle> = new Modifiers<Circle>()
    ) {
        super(
            position,
            radius,
            [255, 0, 0],
            modifier.addOnClick((m) => {
                connectionManager.select(this)
                return true
            })
        )
        this._parentCircuit = circuit
    }

    abstract updateValue(value: boolean): void 

    abstract getValue(): boolean

    getCircuit(): Circuit {
        return this._parentCircuit
    }

    getName(): string {
        return this.name
    }

    connect(connectionPoint: ConnectionPoint): void {
        this._connectedConnectionPoint = connectionPoint
    }

    disconnect(): void {
        this._connectedConnectionPoint = null
    }

    getConnectedConnectionPoint(): ConnectionPoint | null {
        return this._connectedConnectionPoint
    }

    getConnectionPointPosition(): P5.Vector {
        return this.realPos
    }

    getIsParent(): boolean {
        return false
    }
}