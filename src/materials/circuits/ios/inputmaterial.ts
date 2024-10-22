import P5 from "p5";
import { ConnectionManager } from "../connectionmgr";
import { IOMaterial } from "./iomaterial";
import { InputConnectionPoint } from "../inputconnectionpoint";
import { disabledColor, enabledColor } from "../colors";

export class InputMaterial extends IOMaterial implements InputConnectionPoint {

    discriminator: 'INPUT' = 'INPUT';

    constructor(
        p: P5,
        pos: P5.Vector, 
        name: string,
        connectionManager: ConnectionManager,
    ) {
        super(p, name, pos, connectionManager, (circle) => {
            this.updateValue(!this.getValue())
            return true 
        })

        this.getCircuit().addInputObserver(name, (value) => {
            if (value){
                this.setButtonColor(enabledColor)
            } else {  
                this.setButtonColor(disabledColor)
            }
        })
    }

    updateValue(value: boolean): void {
       this.getCircuit().setInputValue(this.getName(), value) 
    }

    getValue(): boolean {
       return this.getCircuit().getInputValue(this.getName()) 
    }

}