import P5 from "p5"
import { Workspace } from './workspace'
import { Screen } from './screen'
import { TestingWorkspace } from "../examples/testing"
import { UI } from "./ui"
import { getMousePos } from "../util/util"
import { WTestingWorkspace } from "../examples/w"

export class CircuitModelingScreen implements Screen {
    
    private workspace: Workspace
    private ui: UI
    // private toolBar: ToolBar | null = null
    // private menu: FloatingMenu | null = null

    constructor(
        public p: P5
    ) {
        // this.currentWorkspace = new DefaultWorkspace()
        this.workspace = new WTestingWorkspace(p)
        this.ui = new UI(p)
    }

    // TODO: fazer algum tipo de menu para selecionar isso OU 
    // fazer um sistema para carregar automaticamente pelos argumentos na url
    setCurrentWorkspace(workspace: Workspace) {
        this.workspace = workspace
        // workspace.save()
        // fazer alguma animação de transição
    }

    notify(msg: string) {
        // TODO: fazer um janelina aparecer em vez de usar o da página 
        alert(msg)
    }

    // --------------------------------
    // IMPLEMENTAÇÃO DA INTERFACE SCENE
    // --------------------------------

    enter(onEnter: () => void): void {
        // TODO: colocar alguma lógica para fazer algum tipo de anição ao entrar 
        // throw new Error("Method not implemented.")
    }
    exit(onExit: () => void): void {
        // TODO: colocar alguma lógica para fazer algum tipo de anição ao sair 
        // throw new Error("Method not implemented.")
    }

    windowResized(newScale: number) {
        // TODO
        this.workspace.setScale(newScale)

        // Não permitir que a escala seja menor que 0.5 (se não textos ficam ilegíveis)
        if (newScale < 0.5) {
            this.ui.setScale(0.5)
        } else {
            this.ui.setScale(newScale)
        }
    }

    mouseWheel(e: MouseEvent): void {
        // this.workspace.mouseWheel(e)
        const minZoom = 0.4
        const maxZoom = 2
        const sensitivityZ = 0.001;
        const scaleFactor = 100;

        // @ts-ignore
        if (e.delta > 0) {
            // this.workspace.setZoom(this.p.constrain(this.workspace.getZoom() - (sensitivityZ * scaleFactor), minZoom, maxZoom));
        } else {
            // this.workspace.setZoom(this.p.constrain(this.workspace.getZoom() + (sensitivityZ * scaleFactor), minZoom, maxZoom));
        }
    }

    draw(): void {
        this.p.background(53)
        this.ui.draw(this.p)
        this.workspace.draw(this.p)
    }

    doubleClicked(e: MouseEvent): void { }

    // talvez devesse por essa lógica em Workspace
    // mas como pressionamento de teclado é algo global, acho que faz um pouco de sentido
    keyPressed(e: KeyboardEvent): void {
        if (e.key == ' ') { // espaço
            this.workspace.resetPosition(this.p)
        }
        if (e.key == 'r') {
            this.workspace.rotateSelected(this.p)
        }
    }

    keyReleased(e: KeyboardEvent): void {
        // this.workspace.keyReleased(this.p)
        // this.ui.keyReleased(this.p)
    }

    mouseClicked(e: MouseEvent): void {
        this.workspace.mouseClicked(this.p, getMousePos(this.p))
        this.ui.mouseClicked(this.p, getMousePos(this.p))
    }

    mousePressed(e: MouseEvent): void {
        this.workspace.mousePressed(this.p, getMousePos(this.p))
        this.ui.mousePressed(this.p, getMousePos(this.p))
    }

    mouseReleased(e: MouseEvent): void {
        this.workspace.mouseReleased(this.p, getMousePos(this.p))
        this.ui.mouseReleased(this.p, getMousePos(this.p))
    }

}