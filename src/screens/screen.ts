import P5 from "p5"

/**
 * Define uma Tela.
 * Uma Tela pode ser a tela inicial, a tela de simulação, ou qualquer outra tela.
 */
export interface Screen {
    enter(onEnter: () => void): void; // talvez tirar esse onEnter e onExit
    exit(onExit: () => void): void; // não sei se gosto disso, mas vai ficar assim por enquanto

    mouseMoved(e: MouseEvent): void;
    windowResized(): void;
    draw(p: P5): void;
    mouseWheel(e: MouseEvent): void;
    doubleClicked(e: MouseEvent): void;
    keyPressed(e: KeyboardEvent): void;
    keyReleased(e: KeyboardEvent): void;
    mouseClicked(e: MouseEvent): void;
    mousePressed(e: MouseEvent): void;
    mouseReleased(e: MouseEvent): void;
}