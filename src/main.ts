import P5 from "p5"
import { Drawable } from "./interfaces/drawable"
import { LogicGate } from "./materials/logicgate"
import { OutputButton } from "./materials/outputcircle"
import { Clickable } from "./interfaces/clickable"
import { RotatingTitle } from "./materials/title"
import { canvaPosToWebglPos, randomPos } from "./util/util"

const sketch = (p: P5) => {
  let drawableElements: Drawable[] = []
  let clickableElements: Clickable[] = []
  let _text: P5.Graphics;
  let cam: P5.Camera;

  p.setup = () => {
    p.createCanvas(800, 600, p.WEBGL) 

    let ob = new OutputButton(randomPos(p))

    drawableElements.push(ob)
    drawableElements.push(new LogicGate(p, "test", randomPos(p)))
    drawableElements.push(new RotatingTitle("Teste", p.createVector(0, 0)))

    clickableElements.push(ob)

    // camera e zoom
    cam = p.createCamera();

    // isso tem que ser definido no setup
    _text = p.createGraphics(400,300);
    _text.clear()
    _text.fill(0);
    _text.textAlign(p.CENTER);
    _text.textSize(50);
    _text.text('paulo palhano', 200, 150);

    p.describe('p5.js is cool!');
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
      o.draw(p)
    });

    p.strokeWeight(0)
    p.rotateY(p.frameCount * 0.01);
    p.texture(_text);
    p.plane(400,300);
  }
}

new P5(sketch)