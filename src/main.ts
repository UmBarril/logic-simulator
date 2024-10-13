import P5 from "p5"
import { canvaPosToWebglPos, randomPos } from "./util/util"
import { RotatingTitle } from "./materials/ui/rotatingtitle"
import { Material } from "./materials/interfaces/material"
import { Circle } from "./materials/shapes/circle"
import { Modifiers } from "./materials/modifiers"
import { OutputMaterial } from "./materials/circuits/outputmaterial"
import { SceneManager } from "./scenemgr"

const sketch = (p: P5) => {
  // let cam: P5.Camera;

  p.setup = () => {
    SceneManager.initialise()
    p.createCanvas(800, 600, p.WEBGL) 

    let circle = new Circle(
      p.createVector(0, 0),
      30,
      p.color(255, 0, 0),
      new Modifiers<Circle>().addOnClick((m) => {
        m.pos = randomPos(p)
        return false
      })
    )
    SceneManager.currentScene.add(circle)

    let om = new OutputMaterial(p, randomPos(p))
    SceneManager.currentScene.add(om)

    // cam = p.createCamera();

    let title = 'logic simulator v0.1'
    let titleMaterial = new RotatingTitle(p, p.createVector(-p.width / 2 + 85, -p.height / 2 + 100), title, true)
    // titleMaterial.setCamera(cam)
    SceneManager.currentScene.add(titleMaterial)

    // camera e zoom
    // cam = p.createCamera();

    // p.describe('p5.js is cool!');
  }

  // TODO: reimplementar sem usar a api não documentada
  // p.mouseWheel = (e: MouseEvent) => {
  //   const sensitivityZ = 0.001;
  //   const scaleFactor = 100;

  //   // @ts-ignore
  //   if (e.delta > 0) {
  //     // usando a api _orbit não documentada segundo https://stackoverflow.com/questions/68986225/orbitcontrol-in-creategraphics-webgl-on-a-2d-canvas
  //     // @ts-ignore
  //     cam._orbit(0, 0, sensitivityZ * scaleFactor);
  //   } else {
  //     // @ts-ignore
  //     cam._orbit(0, 0, -sensitivityZ * scaleFactor);
  //   }
  // }
  
  // p.doubleClicked = (e: MouseEvent) => { } 

  p.keyPressed = (e: KeyboardEvent) => {
    SceneManager.currentScene.getAllKeyboardListeners().forEach(k => {
      k.keyPressed(p, e.key)
    });
  }
  
  p.keyReleased = (e: KeyboardEvent) => {
    SceneManager.currentScene.getAllKeyboardListeners().forEach(k => {
      k.keyReleased(p, e.key)
    });
  }

  p.mouseClicked = (_: MouseEvent) => {
    SceneManager.currentScene.getAllClickableMaterials().forEach(handleClick);
  }

  p.mousePressed = (_: MouseEvent) => {
    SceneManager.currentScene.getAllClickableMaterials().forEach(handlePressed);
  }

  p.mouseReleased = (_: MouseEvent) => {
    SceneManager.currentScene.getAllClickableMaterials().forEach(handleReleased);
  }

  p.draw = () => {
    p.background(53)
    SceneManager.currentScene.getAllMaterials().forEach(handleDraw);
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

    return m.click(p, canvaPosToWebglPos(p, p.mouseX, p.mouseY)) 
  }

  function handlePressed(m: Material) {
    m.children.forEach(c => {
      handlePressed(c)
    })

    m.pressed(p, canvaPosToWebglPos(p, p.mouseX, p.mouseY))
  }

  function handleReleased(m: Material) {
    m.children.forEach(c => {
      handleReleased(c)
    })

    m.released(p, canvaPosToWebglPos(p, p.mouseX, p.mouseY))
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
}

new P5(sketch)