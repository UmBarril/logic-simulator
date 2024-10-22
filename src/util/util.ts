import P5 from 'p5'

// não gosto desse "singleton", mas não achei uma forma melhor de fazer isso por enquanto
export let _global = { lastMousePos: new P5.Vector(0, 0), scale: 1 }

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
    let width = { min: -p.width/2 * 1, max: p.width/2 }
    let height = { min: -p.height/2, max: p.height/2 }
    return p.createVector(p.random(width.min, width.max), p.random(height.min, height.max))
}

export function getMouseDelta(p: P5): P5.Vector {
    console.log(_global.lastMousePos)
    return P5.Vector.sub(getMousePos(p), _global.lastMousePos)
}

export function getGlobalScale(): number {
    return _global.scale
}

/**
 * Função helper para criar uma cor sem uma instância de P5.
 * Note que para que isso funcione, a cor deve ser criada a partir de uma função 
 * {@link P5.draw | draw}, {@link P5.setup | setup}, ou funções chamadas por elas.
 * @param r Vermelho
 * @param g Verde
 * @param b Azul
 * @returns P5.Color
 */
// export function pColor(r: number, g: number, b: number): P5.Color {
//     let c = new P5.Color()
//     c.setRed(r)
//     c.setGreen(g)
//     c.setBlue(b)
//     return c
// }

/**
 * Função helper para criar uma cor sem uma instância de P5.
 * Note que para que isso funcione, a cor deve ser criada a partir de uma função 
 * {@link P5.draw | draw}, {@link P5.setup | setup}, ou funções chamadas por elas.
 * @color Array de 3 posições com os valores de r, g, b
 * @returns P5.Color
 */
// export function pColorFromArray(color: number[]): P5.Color {
//     return pColor(color[0], color[1], color[2])
// }