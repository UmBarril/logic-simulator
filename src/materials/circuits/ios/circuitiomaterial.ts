import P5 from 'p5'
import { Modifiers } from "../../modifiers";
import { Circle } from "../../shapes/circle";
import { ConnectionManager } from '../connectionmgr';
import { ConnectionPoint, PointType } from '../connectionpoint';
import { IOState } from '../../../logic/iostate';

export class CircuitIOMaterial extends Circle implements ConnectionPoint {

    protected constructor(
        private state: IOState,
        connectionManager: ConnectionManager,
        position: P5.Vector,
        private type: PointType,
        private radius: number = 30,
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

    getPointType(): PointType {
        return this.type;
    }

    updateValue(value: boolean): void {
        this.state.value = value
    }
    
    getValue(): boolean {
        return this.state.value
    }

    getConnectionPointPosition(): P5.Vector {
        return this.realPos
    }
}