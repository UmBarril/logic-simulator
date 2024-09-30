import P5 from "p5"

const sketch = (p: P5) => {
  p.setup = () => {
    p.createCanvas(800, 600)
  }

  p.draw = () => {
    p.background(0)
  }
}

new P5(sketch)