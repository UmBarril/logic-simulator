import P5 from "p5"
import { getMousePos } from "./util/util"
import { RotatingTitle } from "./materials/ui/rotatingtitle"
import { Material } from "./materials/interfaces/material"
import { MaterialManager as MaterialManager } from "./materialmgr"
import { Workspace } from "./workspace"
import { TestingWorkspace } from "./examples/testing"
import { ConnectionManager } from "./materials/circuits/connectionmgr"

// TODODODO tirar isso daqui e por em outro lugar
export let scale = 1
export let offset: P5.Vector

const sketch = (p: P5) => {

  const initialWidth = p.windowWidth
  const initialHeight = p.windowHeight

  const connectionManager = new ConnectionManager()

  let dragging = false

  p.setup = () => {
    MaterialManager.initialize()

    p.createCanvas(initialWidth, initialHeight, p.WEBGL) 
    offset = p.createVector(0, 0)

    // TODO: fazer algum tipo de menu para selecionar isso OU 
    // fazer um sistema para carregar automaticamente pelos argumentos na url
    let workspace: Workspace = new TestingWorkspace()
    workspace.getMaterials(p, connectionManager).forEach(m => MaterialManager.current.add(m))

    setupUI()
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    MaterialManager.current.updateUiPostions()
  }

  // zoom
  // TODO: mover essa lógica para fora daqui
  p.mouseWheel = (e: MouseEvent) => {
    const min = 0.4
    const max = 2
    const sensitivityZ = 0.001;
    const scaleFactor = 100;

    // @ts-ignore
    if (e.delta > 0) {
      scale = p.constrain(scale - (sensitivityZ * scaleFactor), min, max);
    } else {
      scale = p.constrain(scale + (sensitivityZ * scaleFactor), min, max);
    }
  }
  
  p.doubleClicked = (e: MouseEvent) => { } 

  p.keyPressed = (e: KeyboardEvent) => {
    MaterialManager.current.getAllKeyboardListeners().forEach(k => {
      k.keyPressed(p, e.key)
    });
  }
  
  p.keyReleased = (e: KeyboardEvent) => {
    if (e.key == ' ') { // espaço
      offset = p.createVector(0, 0) // vai para o meio
    }
    MaterialManager.current.getAllKeyboardListeners().forEach(k => {
      k.keyReleased(p, e.key)
    });
  }

  p.mouseClicked = (_: MouseEvent) => {
    MaterialManager.current.getAllClickableMaterials().forEach(handleClick);

    let clickedOutside = true
    let stack = [...MaterialManager.current.getAllClickableMaterials()]
    while(stack.length > 0) {
      const m = stack.pop()
      if (m === undefined) {
        break
      }
      stack.concat(m.children)
      if (m.isInside(getMousePos(p))) {
        clickedOutside = false
        break
      }
    }
    if (clickedOutside) {
      connectionManager.unselectIfSelected()
      return 
    }
  }

  p.mousePressed = (_: MouseEvent) => {
    // verificar se clicou fora
    let pressedOutside = true
    let stack = [...MaterialManager.current.getAllClickableMaterials()]
    while(stack.length > 0) {
      const m = stack.pop()
      if (m === undefined) {
        break
      }
      stack.concat(m.children)
      console.log(m)
      if (m.isInside(getMousePos(p))) {
        pressedOutside = false
        break
      }
    }
    if (pressedOutside) {
      console.log("cc")
      dragging = true
      return 
    }
    
    // se não clicou fora, clicou em algum material
    MaterialManager.current.getAllClickableMaterials().forEach(handlePressed);
  }

  p.mouseReleased = (_: MouseEvent) => {
    MaterialManager.current.getAllClickableMaterials().forEach(handleReleased);
    dragging = false
  }

  p.draw = () => {
    p.background(53)

    MaterialManager.current.getAllUIMaterials().forEach(handleDrawUI);

    if (dragging) {
      // https://editor.p5js.org/palpista11/sketches/XRx0nlsXi
      // TODO: tornar isso mais suave e natural
      p.cursor(p.HAND)
      let change = p.createVector(
        p.map(p.mouseX - p.pmouseX, -100, 100, -0.5, 0.5, true), 
        p.map(p.mouseY - p.pmouseY, -100, 100, -0.5, 0.5, true)
      ).mult(scale)

      offset.add(change)
    }
    p.translate(offset.x * p.width / 2, offset.y * p.height / 2)

    p.scale(scale) // zoom
    MaterialManager.current.getAllWorkspaceMaterials().forEach(handleDraw);
  }

  // se um filho foi clicado, ignorar clique no pai
  function handleClick(m: Material): boolean {
    let ignore = false

    m.children.forEach(c => {
      ignore = handleClick(c)
    })

    if (ignore) {
       return true
    }
    let mousePos = getMousePos(p)
    if (m.isInside(mousePos)) {
      return m.click(p, mousePos) 
    }
    return false
  }

  function handlePressed(m: Material): boolean {
    let ignore = false
    m.children.forEach(c => {
      ignore = handlePressed(c)
    })

    if (ignore) {
       return true
    }
    let mousePos = getMousePos(p)
    if (m.isInside(mousePos)) {
      return m.pressed(p, mousePos)
    }
    return false
  }

  function handleReleased(m: Material) {
    m.children.forEach(c => {
      handleReleased(c)
    })

    m.released(p, getMousePos(p))
  }

  function handleDraw(m: Material) {
    m.children.forEach(c => {  
      c.pointOfOrigin = m.pos
      handleDraw(c)
    })
    m.draw(p)
  }

  function handleDrawUI(m: Material) {
    m.children.forEach(c => {  
      c.pointOfOrigin = m.pos
      handleDraw(c)
    })
    p.push()
    m.draw(p)
    p.pop()
  }

  // por isso em outro lugar
  function setupUI() {
      let title = 'logic simulator v0.1'

      let titleMaterial = new RotatingTitle(
        p, 
        p.createVector(-p.width / 2 + 85, -p.height / 2 + 100), // posição
        title, // texto
        true // rainbowMode
      )
      MaterialManager.current.add(titleMaterial, true)
  }
}

new P5(sketch)