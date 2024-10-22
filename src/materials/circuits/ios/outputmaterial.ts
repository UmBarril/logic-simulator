import P5 from "p5";
import { ConnectionManager } from "../connectionmgr";
import { IOMaterial } from "./iomaterial";
import { OutputConnectionPoint } from "../outputconnectionpoint";
import { disabledColor, enabledColor } from "../colors";

export class OutputMaterial extends IOMaterial implements OutputConnectionPoint {

    discriminator: 'OUTPUT' = 'OUTPUT';

    constructor(
        p: P5,
        pos: P5.Vector, 
        name: string,
        connectionManager: ConnectionManager,
    ) {
        super(p, name, pos, connectionManager, (_) => { return true })

        this.getCircuit().addOutputObserver(name, (value) => {
            if (value){
                this.setButtonColor(enabledColor)
            } else {  
                this.setButtonColor(disabledColor)
            }
        })
    }

    updateValue(value: boolean): void {
        throw new Error("Method not implemented.");
    }

    getValue(): boolean {
       return this.getCircuit().getOutputValue(this.getName()) 
    }

}