import P5 from "p5"
import { Screen } from "./screen";

/**
 * Classe para gerenciar as Telas.
 * Veja mais em {@link Screen}
 */
export class ScreenManager  {

    private currentScreen: Screen | null = null

    constructor() { }

    setCurrentScreen(screen: Screen) {
        if (this.isCurrentScreenValid()) {
            this.currentScreen?.exit(
                () => {
                    this.currentScreen = screen
                    this.currentScreen.enter(() => {})
                }
            ) 
            return
        } 
        this.currentScreen = screen
    }

    draw(p: P5) {
        if (!this.isCurrentScreenValid()) {
            // console.log("ScreenManager: currentScreen is not valid")
            return;
        }
        // console.log("ScreenManager: draw")
        this.currentScreen?.draw(p)
    }

    windowResized(p: P5, newScale: number) { 
        if (!this.isCurrentScreenValid()) {
            return;
        }
        this.currentScreen?.windowResized(newScale)
    }

    mouseWheel(e: MouseEvent): void {
        if (!this.isCurrentScreenValid()) {
            return;
        }
        this.currentScreen?.mouseWheel(e)
    }

    doubleClicked(e: MouseEvent) {
        if (!this.isCurrentScreenValid()) {
            return;
        }
        this.currentScreen?.doubleClicked(e)
    }

    keyPressed(e: KeyboardEvent) {
        if (!this.isCurrentScreenValid()) {
            return;
        }
        this.currentScreen?.keyPressed(e)
    }

    keyReleased(e: KeyboardEvent) {
        if (!this.isCurrentScreenValid()) {
            return;
        }
        this.currentScreen?.keyReleased(e)
    }

    mouseClicked(e: MouseEvent) {
        if (!this.isCurrentScreenValid()) {
            return;
        }
        this.currentScreen?.mouseClicked(e)
    }

    mousePressed(e: MouseEvent) {
        if (!this.isCurrentScreenValid()) {
            return;
        }
        this.currentScreen?.mousePressed(e)
    }

    mouseReleased(e: MouseEvent) {
        if (!this.isCurrentScreenValid()) {
            return;
        }
        this.currentScreen?.mouseReleased(e)
    }

    isCurrentScreenValid() {
        return this.currentScreen != null
    }
}