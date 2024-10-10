import P5 from 'p5'

// Note que p.mouseX e p.mouseY são as coordenadas do canvas, não do mundo
// Também, p.mouseX e p.mouseY começam no canto superior esquerdo, ao contrário do webgl

// Posição do mouse no mundo (webgl)
// TODO: fazer isso funcionar quando a câmera estiver em outra posição
export function canvaPosToWebglPos(p: P5, x: number, y: number): P5.Vector {
    return p.createVector(x - p.width/2, y - p.height/2)
}