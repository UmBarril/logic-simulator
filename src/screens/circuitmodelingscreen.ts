import P5 from "p5"
import { Workspace } from './workspace'
import { Screen } from './screen'
import { UI } from "./ui"
import { getMousePos } from "../util/util"
import { Menu } from "../materials/ui/menu"
import { WTestingWorkspace } from "../examples/w"
import { ToolBar2 } from "../materials/ui/toolbar2"

export class CircuitModelingScreen implements Screen {
    
    private workspace: Workspace
    private ui: UI
    private toolBar: ToolBar2
    private menu: Menu  
    // private menu: FloatingMenu | null = null

    constructor(
        public p: P5
    ) {
        // this.currentWorkspace = new DefaultWorkspace()
        this.workspace = new WTestingWorkspace(p)
        this.ui = new UI(p)
        this.toolBar = new ToolBar2(p, this.workspace);
        this.menu = new Menu(p, p.createVector(0, -300));
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

    mouseMoved(e: MouseEvent): void {
        this.toolBar.mouseMoved(this.p);
    }

    windowResized() {
        // TODO
        this.workspace.windowResized(this.p)
        this.ui.windowResized(this.p)
        this.menu.setPosition(this.p.createVector(this.p.width / 2, this.p.height / 2))
        this.menu.setPosition(this.p.createVector(this.p.width / 2, this.p.height / 2))
    }

    mouseWheel(e: MouseEvent): void {
        // this.workspace.mouseWheel(e)
        const minZoom = 0.4
        const maxZoom = 2
        const sensitivityZ = 0.001;
        const scaleFactor = 100;

        // @ts-ignore
        if (e.delta > 0) {
            this.workspace.scale = this.p.constrain(this.workspace.scale - (sensitivityZ * scaleFactor), minZoom, maxZoom);
        } else {
            this.workspace.scale = this.p.constrain(this.workspace.scale + (sensitivityZ * scaleFactor), minZoom, maxZoom);
        }
    }

    draw(): void {
        this.p.background(53)
        this.ui.draw(this.p)
        this.workspace.draw(this.p)
        this.toolBar.draw(this.p);
        // this.menu.draw(this.p) // COMENTADO ATÉ FUNCIONAR
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
        if (e.key == 'm'){
            this.menu.toggleVisibility()
        }
        if (e.key == 'm'){
            this.menu.toggleVisibility()
        }
    }

    keyReleased(e: KeyboardEvent): void {
        // this.workspace.keyReleased(this.p)
        // this.ui.keyReleased(this.p)
    }

    mouseClicked(e: MouseEvent): void {
        this.workspace.mouseClicked(this.p, getMousePos(this.p))
        this.ui.mouseClicked(this.p, getMousePos(this.p))
        this.toolBar.mouseClicked(this.p, getMousePos(this.p));
        this.menu.mouseClicked(this.p, getMousePos(this.p))
    }

    mousePressed(e: MouseEvent): void {
        this.workspace.mousePressed(this.p, getMousePos(this.p))
        this.ui.mousePressed(this.p, getMousePos(this.p))
        this.menu.mousePressed(this.p, getMousePos(this.p))
        this.menu.mousePressed(this.p, getMousePos(this.p))
    }

    mouseReleased(e: MouseEvent): void {
        console.log("test")
        console.log("test")
        this.workspace.mouseReleased(this.p, getMousePos(this.p))
        this.ui.mouseReleased(this.p, getMousePos(this.p))
        this.menu.mouseReleased(this.p, getMousePos(this.p))
        this.menu.mouseReleased(this.p, getMousePos(this.p))
    }


    


    
}