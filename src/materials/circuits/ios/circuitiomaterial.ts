import P5 from 'p5'
import { Modifiers } from "../../modifiers";
import { Circle } from "../../shapes/circle";
import { ConnectionManager } from '../connectionmgr';
import { ConnectionPoint, PointType } from '../connectionpoint';

export class CircuitIOMaterial extends Circle implements ConnectionPoint {

    private value: boolean = false

    private _connectedConnectionPoint: ConnectionPoint | null = null

    protected constructor(
        private name: string,
        connectionManager: ConnectionManager,
        position: P5.Vector,
        private type: PointType,
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

    getPointType(): PointType {
        return this.type;
    }

    updateValue(value: boolean): void {
        this.value = value
    }
    
    getValue(): boolean {
        return this.value
    }

    getConnectionPointPosition(): P5.Vector {
        return this.realPos
    }
}