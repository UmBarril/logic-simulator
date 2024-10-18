import P5 from "p5"
import { ScreenManager } from "./screens/screenmgr"
import { CircuitModelingScreen } from "./screens/circuitmodelingscreen"

const sketch = (p: P5) => {
  const screenManager = new ScreenManager()

  function resizeCanvas() {
    let scale: number
    if (p.windowWidth / p.windowHeight > 16/9) {
      p.resizeCanvas((p.windowHeight * 16) / 9, p.windowHeight);
      scale = p.windowHeight / 1080
    } else {
      p.resizeCanvas(p.windowWidth, (p.windowWidth * 9) / 16);
      scale = p.windowWidth / 1920
    }
    screenManager.windowResized(p, scale)
  }

  function mouseOutOfCanvas() {
    return p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL) 
    screenManager.setCurrentScreen(new CircuitModelingScreen(p))
    resizeCanvas() // tem que ser depois de setCurrentScreen
  }

  p.windowResized = (_) => {
    resizeCanvas()
  }

  p.keyPressed = (e: KeyboardEvent) => {
    screenManager.keyPressed(e)
  }
  
  p.keyReleased = (e: KeyboardEvent) => {
    screenManager.keyReleased(e)
  }

  p.mouseWheel = (e: MouseEvent) => {
    if (mouseOutOfCanvas()) {
      return
    }
    screenManager.mouseWheel(e)
  }

  p.doubleClicked = (e: MouseEvent) => {
    if (mouseOutOfCanvas()) {
      return
    }
    screenManager.doubleClicked(e)
  } 

  p.mouseClicked = (e: MouseEvent) => {
    if (mouseOutOfCanvas()) {
      return
    }
    screenManager.mouseClicked(e)
  }

  p.mousePressed = (e: MouseEvent) => {
    if (mouseOutOfCanvas()) {
      return
    }
    screenManager.mousePressed(e)
  }

  p.mouseReleased = (e: MouseEvent) => {
    if (mouseOutOfCanvas()) {
      return
    }
    screenManager.mouseReleased(e)
  }

  p.draw = () => {
    screenManager.draw(p)
  }
}

new P5(sketch)