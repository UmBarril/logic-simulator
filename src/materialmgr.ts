import { Material } from './materials/interfaces/material'
import { KeyboardListener } from './materials/interfaces/keyboardlistener'

export class MaterialManager {

    private static _current: MaterialManager

    private workspaceMaterials: Material[] = [] // TODO: por em outro lugar
    private uiMaterials: Material[] = []
    private keyboardListeners: KeyboardListener[] = [] // TODO: remover isso ou por em outro lugar

    public static initialize(){
        MaterialManager._current = new MaterialManager()
    }

    public static get current() {
        return MaterialManager._current
    }

    notify(msg: string) {
        // TODO
    }

    // todo: uma melhor maneira de resolve isso
    // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
    isKeyboardListener(m: Material | KeyboardListener): m is KeyboardListener {
        return (m as KeyboardListener).keyPressed !== undefined
    }

    add(material: Material, isUI: boolean = false){
        if (this.isKeyboardListener(material)){
            this.keyboardListeners.push(material)
        }
        if (isUI) {
            this.uiMaterials.push(material)
            return
        }
        this.workspaceMaterials.push(material)
    }

    updateUiPostions() {
        this.uiMaterials.forEach((m) => {

        })
    }

    removeWorkspaceMaterial(material: Material){
        const index = this.workspaceMaterials.indexOf(material)
        if (index > -1){
            this.workspaceMaterials.splice(index, 1)
        }
    }

    getAllWorkspaceMaterials() {
        return new Array().concat(this.workspaceMaterials)
    }

    getAllUIMaterials() {
        return new Array().concat(this.uiMaterials)
    }


    getAllKeyboardListeners() {
        return this.keyboardListeners
    }

    getAllClickableMaterials() {
        // TODO: implementar uma maneira de retornar apenas os clicáveis
        return this.workspaceMaterials
    }
}