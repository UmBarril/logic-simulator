import P5  from "p5"
import { getMousePos } from "./util/util"
import { RotatingTitle } from "./materials/ui/rotatingtitle"
import { Material } from "./materials/interfaces/material"
import { MaterialManager as MaterialManager } from "./materialmgr"
import { Workspace } from "./workspace"
import { TestingWorkspace } from "./examples/testing"

const sketch = (p: P5) => {

  let width = p.windowWidth
  let height = p.windowHeight

  let cam: P5.Camera // TEM que ser definido no setup
  let ui: P5.Graphics

  p.setup = () => {
    MaterialManager.initialize()
    p.createCanvas(width, height, p.WEBGL) 

    ui = p.createGraphics(width, height, p.WEBGL)

    cam = p.createCamera();
    p.setCamera(cam)

    // TODO: fazer algum tipo de menu para selecionar isso OU 
    // fazer um sistema para carregar automaticamente pelos argumentos na url

    let workspace: Workspace = new TestingWorkspace()
    workspace.getMaterials(p).forEach(m => MaterialManager.current.add(m))

    setupUI()

    p.describe('p5.js');
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    ui.resizeCanvas(p.windowWidth, p.windowHeight);
    MaterialManager.current.updateUiPostions()
  }

  // TODO: reimplementar sem usar a api não documentada
  p.mouseWheel = (e: MouseEvent) => {
    const sensitivityZ = 0.001;
    const scaleFactor = 100;

    // @ts-ignore
    if (e.delta > 0) {
      // usando a api _orbit não documentada segundo https://stackoverflow.com/questions/68986225/orbitcontrol-in-creategraphics-webgl-on-a-2d-canvas
      // @ts-ignore
      cam._orbit(0, 0, sensitivityZ * scaleFactor);
    } else {
      // @ts-ignore
      cam._orbit(0, 0, -sensitivityZ * scaleFactor);
    }
  }
  
  p.doubleClicked = (e: MouseEvent) => { } 

  p.keyPressed = (e: KeyboardEvent) => {
    MaterialManager.current.getAllKeyboardListeners().forEach(k => {
      k.keyPressed(p, e.key)
    });
  }
  
  p.keyReleased = (e: KeyboardEvent) => {
    MaterialManager.current.getAllKeyboardListeners().forEach(k => {
      k.keyReleased(p, e.key)
    });
  }

  p.mouseClicked = (_: MouseEvent) => {
    console.log("mouse.x" + getMousePos(p).x)
    console.log("cam.centerX" + cam.upZ)

    MaterialManager.current.getAllClickableMaterials().forEach(handleClick);
  }

  p.mousePressed = (_: MouseEvent) => {
    MaterialManager.current.getAllClickableMaterials().forEach(handlePressed);
  }

  p.mouseReleased = (_: MouseEvent) => {
    MaterialManager.current.getAllClickableMaterials().forEach(handleReleased);
  }

  p.draw = () => {
    p.background(53)
    
    MaterialManager.current.getAllUIMaterials().forEach(handleDrawUI);
    MaterialManager.current.getAllWorkspaceMaterials().forEach(handleDraw);
  }

  // se um filho foi clicado, ignorar clique no pai
  function handleClick(m: Material): boolean {
    let ignore = false

    m.children.forEach(c => {
      ignore = handleClick(c)
    })

    if (ignore) {
       return ignore
    }

    return m.click(p, getMousePos(p)) 
  }

  function handlePressed(m: Material) {
    m.children.forEach(c => {
      handlePressed(c)
    })

    m.pressed(p, getMousePos(p))
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
    p.push()
    m.draw(p)
    p.pop()
  }

  function handleDrawUI(m: Material) {
    m.children.forEach(c => {  
      c.pointOfOrigin = m.pos
      handleDraw(c)
    })
    ui.push()
    m.draw(p)
    ui.pop()
  }

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

