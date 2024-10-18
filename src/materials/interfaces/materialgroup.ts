import P5 from 'p5'
import { Material } from './material'
import { Modifiers } from '../modifiers'

export abstract class MaterialGroup extends Material {
    
    private _children: Material[] = []
    
    constructor(
        pos: P5.Vector,
        modifiers = new Modifiers<MaterialGroup>()
    ) { 
        super(pos, modifiers)
    }

    /**
     * Adiciona um material a este grupo
     * @param material Material a ser adicionado
     */
    addChild(material: Material) {
        this._children.push(material)
    } 
    
    /** Todos os mateiris deste grupo */
    public get children() {
        return this._children
    }

    override set scale(scale: number){
        super.scale = scale
        this._children.forEach(child => child.scale = scale)
    }

    /** 
     * Desenha os filhos deste material
     * @param p P5
     * */ 
    override draw(p: P5) {
        this._children.forEach(child => {
            child.pointOfOrigin = this.realPos
            child.draw(p)
        })
    }

    /**
     * Verifica se o clique foi dentro de algum dos filhos
     * @param p P5
     * @param pos Posição do clique
     * @returns True se o clique foi dentro de algum dos filhos
     */ 
    override mouseClicked(p: P5, pos: P5.Vector): boolean {
        return this._children.some(child => child.mouseClicked(p, pos))
    }

    /**
     * Verifica se o pressionamente foi dentro de algum dos filhos
     * @param p P5
     * @param pos Posição do clique
     * @returns True se o pressionamento foi dentro de algum dos filhos
     */ 
    override mousePressed(p: P5, pos: P5.Vector): boolean {
        return this._children.some(child => child.mousePressed(p, pos))
    }

    /**
     * Ativa o mouseReleased em todos os filhos
     * @param p P5
     * @param pos Posição de soltura
     */ 
    override mouseReleased(p: P5, pos: P5.Vector): void {
        this._children.forEach(child => child.mouseReleased(p, pos))
    }

    /**
     * Verifica se o ponto está dentro de algum dos filhos
     * @param pos Posição do clique
     * @returns Verdadeiro se o ponto está dentro de algum dos filhos
     */
    override isInside(pos: P5.Vector): boolean {
        return this._children.some(child => child.isInside(pos))
    }

}