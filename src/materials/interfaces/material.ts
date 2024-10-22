import P5 from "p5";
import { Drawable } from "./drawable";
import { Clickable } from "./clickable";
import { Modifiers } from "../modifiers";

// TODO: fazer uma interface para facilitar rotacao
export abstract class Material implements Drawable, Clickable {

    // private isEnabled: boolean = true
    private _pointOfOrigin: P5.Vector = new P5.Vector(0, 0)
    private _scale = 1

    // // se isto tiver ativado, cliques feitos em submateriais não serão passados para o material pai
    // private overrideChildren: boolean = false 

    constructor(
        private _pos: P5.Vector,
        private _modifiers: Modifiers<any> = new Modifiers<any>()
    ){ }

    /**
     * Função chamada constantemente para desenhar o material.
     * @param p Instância do P5
     */
    abstract draw(p: P5 | P5.Graphics): void;

    /**
     * Usado para verificar se o ponto está dentro do material.
     * Funções de clique e pressionar são chamadas apenas se o ponto estiver dentro do material.
     * @param pos Posição do ponto a ser verificado.
     */
    abstract isInside(pos: P5.Vector): boolean

    /**
     * Converte um valor de acordo com a escala do material.
     * @param n 
     * @returns 
     */
    scaleVector(v: P5.Vector): P5.Vector {
        return v.copy().mult(1/this.getScale())
    }

    /**
     * Converte um valor de acordo com a escala do material.
     * @param n 
     * @returns 
     */
    scale(n: number): number {
        return n * 1/this.getScale()
    }

    /**
     * @param p P5
     * @param pos Posição do mouse
     * @returns Se clicou dentro
     */
    mousePressed(p: P5, pos: P5.Vector): boolean {
        // talvez passar essa lógica para algum outro lugar
        if (this._modifiers.onMousePressed != null && this.isInside(pos)){
            return this._modifiers.onMousePressed(this, pos)
        }
        return false
    }

    /**
     * @param p P5
     * @param pos Posição do mouse
     */
    mouseReleased(p: P5, pos: P5.Vector): void {
        if (this._modifiers.onMouseReleased != null) {
            this._modifiers.onMouseReleased(this, pos)
        }
    }

    /**
     * @param p P5
     * @param pos Posição do ponto
     * @returns Se o material pai deve ignorar o clique
     */
    mouseClicked(p: P5, pos: P5.Vector): boolean {
        if (this._modifiers.onClick != null && this.isInside(pos)){
            return this._modifiers.onClick(this, pos)
        }
        return false
    }

    public set modifiers(modifiers: Modifiers<any>){
        this._modifiers = modifiers
    }

    public get modifiers(){
        return this._modifiers
    }

    /**
     * Posição do material relativo ao ponto de origem global
     * */ 
    public get realPos(): P5.Vector {
        return this.pos.copy().add(this.pointOfOrigin)
    }

    public set x(x: number){
        this.pos.x = x;
    }

    public get x(){
        return this.pos.x;
    }

    public set y(y: number){
        this.pos.y = y;
    }

    public get y(){
        return this.pos.y;
    }

    /**
     * Define a posição do material relativo ao seu ponto de origem 
     * */ 
    public set pos(pos: P5.Vector){
        this._pos = pos;
    }

    /**
     * Retorna a posição do material relativo ao seu ponto de origem 
     * */ 
    public get pos(){
        return this._pos;
    }

    /**
     * Retorna o ponto de origem do material.
     */
    public get pointOfOrigin(): P5.Vector {
        return this._pointOfOrigin;
    }

    /**
     * Define o ponto de origem do material.
     * Util quando o material é um submaterial de outro material.
     */
    public set pointOfOrigin(value: P5.Vector) {
        this._pointOfOrigin = value;
    }

    public getScale(){
        return this._scale
    }

    public setScale(scale: number){
        this._scale = scale
    }
}