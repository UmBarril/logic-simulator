import { Material } from './materials/interfaces/material'
import { KeyboardListener } from './materials/interfaces/keyboardlistener'

export class SceneManager {

    private static _currentScene: SceneManager

    private materials: Material[] = [] // TODO: por em outro lugar
    private keyboardListeners: KeyboardListener[] = [] // TODO: remover isso ou por em outro lugar

    public static initialise(){
        SceneManager._currentScene = new SceneManager()
    }

    public static get currentScene() {
        return SceneManager._currentScene
    }

    notify(msg: string) {
        // TODO
    }

    // todo: uma melhor maneira de resolve isso
    // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
    isKeyboardListener(m: Material | KeyboardListener): m is KeyboardListener {
        return (m as KeyboardListener).keyPressed !== undefined
    }

    add(material: Material){
        this.materials.push(material)
        if (this.isKeyboardListener(material)){
            this.keyboardListeners.push(material)
        }
    }

    removeMaterial(material: Material){
        const index = this.materials.indexOf(material)
        if (index > -1){
            this.materials.splice(index, 1)
        }
    }

    getAllMaterials() {
        return this.materials
    }

    getAllKeyboardListeners() {
        return this.keyboardListeners
    }

    getAllClickableMaterials() {
        // TODO: implementar uma maneira de retornar apenas os clicáveis
        return this.materials
    }
}