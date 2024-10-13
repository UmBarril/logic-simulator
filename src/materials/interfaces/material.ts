import P5 from "p5";
import { Drawable } from "./drawable";
import { Clickable } from "./clickable";
import { Modifiers } from "../modifiers";

// TODO: fazer uma interface para facilitar rotacao
export abstract class Material implements Drawable, Clickable {

    private isEnabled: boolean = true
    private _pointOfOrigin: P5.Vector = new P5.Vector(0, 0)
    private _children: Material[] = []

    constructor(
        private _pos: P5.Vector,
        private _modifiers: Modifiers<any> = new Modifiers<any>()
    ){ }

    /**
     * Função chamada constantemente para desenhar o material.
     * @param p Instância do P5
     */
    abstract draw(p: P5): void

    /**
     * Usado para verificar se o ponto está dentro do material.
     * Funções de clique e pressionar são chamadas apenas se o ponto estiver dentro do material.
     * @param pos Posição do ponto a ser verificado.
     */
    abstract isInside(pos: P5.Vector): boolean

    public get children() {
        return this._children
    }

    addChild(child: Material){
        this._children.push(child)
    }

    pressed(p: P5, pos: P5.Vector): void {
        if (this._modifiers.onMousePressed != null && this.isInside(pos)){
            this._modifiers.onMousePressed(this, pos)
        }
    }

    released(p: P5, pos: P5.Vector): void {
        if (this._modifiers.onMouseReleased != null) {
            this._modifiers.onMouseReleased(this, pos)
        }
    }

    click(p: P5, pos: P5.Vector): boolean {
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
     * Difine a posição do material relativo ao seu ponto de origem 
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

}