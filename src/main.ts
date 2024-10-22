import P5 from "p5"
import { ScreenManager } from "./screens/screenmgr"
import { CircuitModelingScreen } from "./screens/circuitmodelingscreen"

const sketch = (p: P5) => {
  const screenManager = new ScreenManager()

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL) 
    screenManager.setCurrentScreen(new CircuitModelingScreen(p))
  }

  p.mouseMoved = (e: MouseEvent) => {
    screenManager.mouseMoved(e)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    screenManager.windowResized(p)
  }

  p.mouseWheel = (e: MouseEvent) => {
    screenManager.mouseWheel(e)
  }
  
  p.doubleClicked = (e: MouseEvent) => {
    screenManager.doubleClicked(e)
  } 

  p.keyPressed = (e: KeyboardEvent) => {
    screenManager.keyPressed(e)
  }
  
  p.keyReleased = (e: KeyboardEvent) => {
    screenManager.keyReleased(e)
  }

  p.mouseClicked = (e: MouseEvent) => {
    screenManager.mouseClicked(e)
  }

  p.mousePressed = (e: MouseEvent) => {
    screenManager.mousePressed(e)
  }

  p.mouseReleased = (e: MouseEvent) => {
    screenManager.mouseReleased(e)
  }

  p.draw = () => {
    screenManager.draw(p)
  }
}

new P5(sketch)