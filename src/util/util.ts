import P5 from 'p5'

// Note que p.mouseX e p.mouseY são as coordenadas do canvas, não do mundo
// Também, p.mouseX e p.mouseY começam no canto superior esquerdo, ao contrário do webgl

// Posição do mouse no mundo (webgl)
// TODO: fazer isso funcionar quando a câmera estiver em outra posição
export function canvaPosToWebglPos(p: P5, x: number, y: number): P5.Vector {
    return p.createVector(x - p.width/2, y - p.height/2)
}

// Posição do mouse no mundo
// export function getMousePosRelativeToWebgl(p: P5): P5.Vector {
//     return canvaPosToWebglPos(p, p.mouseX, p.mouseY).mult(1/scale)
// }

// TODO: consertar, pois a escala e offsets não estão sendo considerados corretamente
// Posição do mouse no mundo
export function getMousePos(p: P5): P5.Vector {
    return canvaPosToWebglPos(p, p.mouseX, p.mouseY)
}

/**
 * Retorna uma posição aleatória no mundo (webgl)
 * @param p P5 instance
 * @returns Uma posição aleatória
 */
export function randomPos(p: P5): P5.Vector {
    // levando em conta que as coordenadas do webgl começam no centro (0,0)
    let width = { min: -p.width/2, max: p.width/2 }
    let height = { min: -p.height/2, max: p.height/2 }
    return p.createVector(p.random(width.min, width.max), p.random(height.min, height.max))
}
