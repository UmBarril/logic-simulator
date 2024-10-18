import P5 from "p5"

/**
 * Define uma Tela.
 * Uma Tela pode ser a tela inicial, a tela de simulação, ou qualquer outra tela.
 */
export interface Screen {
    enter(onEnter: () => void): void; // talvez tirar esse onEnter e onExit
    exit(onExit: () => void): void; // não sei se gosto disso, mas vai ficar assim por enquanto

    /**
     * Método chamado quando a janela é redimensionada.
     * Ele considera que a tela sempre será 16/9, e que a escala da tela é 1 para 1920/1080.
     * @param newScale Nova escala da tela
     */
    windowResized(newScale: number): void;

    draw(p: P5): void;
    mouseWheel(e: MouseEvent): void;
    doubleClicked(e: MouseEvent): void;
    keyPressed(e: KeyboardEvent): void;
    keyReleased(e: KeyboardEvent): void;
    mouseClicked(e: MouseEvent): void;
    mousePressed(e: MouseEvent): void;
    mouseReleased(e: MouseEvent): void;
}