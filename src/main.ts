import P5 from "p5"
import { Drawable } from "./interfaces/drawable"
import { LogicGate } from "./materials/logicgate"
import { OutputButton } from "./materials/outputcircle"
import { Clickable } from "./interfaces/clickable"
import { canvaPosToWebglPos, randomPos } from "./util/util"
import { RotatingTitle } from "./materials/random/rotatingtitle"

const sketch = (p: P5) => {
  let drawableElements: Drawable[] = []
  let clickableElements: Clickable[] = []
  let _text: P5.Graphics;
  let cam: P5.Camera;

  p.setup = () => {
    p.createCanvas(800, 600, p.WEBGL) 

    let ob = new OutputButton(randomPos(p))

    drawableElements.push(ob)

    let title = 'logic simulator v0.1'
    drawableElements.push(
      new RotatingTitle(p, p.createVector(-p.width / 2 + 85, -p.height / 2 + 100), title, true)
    )

    clickableElements.push(ob)

    // camera e zoom
    cam = p.createCamera();

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
  
  p.mouseClicked = (e: MouseEvent) => {
    clickableElements.forEach(c => {
      c.click(p, canvaPosToWebglPos(p, p.mouseX, p.mouseY))
    });
  }

  p.mousePressed = (e: MouseEvent) => {
    clickableElements.forEach(c => {
      c.pressed(p, canvaPosToWebglPos(p, p.mouseX, p.mouseY))
    });
  }

  p.mouseReleased = (e: MouseEvent) => {
    clickableElements.forEach(c => {
      c.released(p, canvaPosToWebglPos(p, p.mouseX, p.mouseY))
    });
  }

  p.draw = () => {
    p.background(53)

    drawableElements.forEach(o => {
      p.push()
      o.draw(p)
      p.pop()
    });
  }
}

new P5(sketch)