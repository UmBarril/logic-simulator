import P5 from "p5"
import { Material } from "./interfaces/material";

type Callback<T> = ((m: T, pos: P5.Vector) => boolean) | null

export class Modifiers<T extends Material> {

    constructor(
        public onClick: Callback<T> = null,
        public onMousePressed: Callback<T> = null,
        public onMouseReleased: Callback<T> = null,
        public zIndex: number = 0
    ){
        this.onClick = onClick;
        this.onMousePressed = onMousePressed;
    }

    addOnClick(callback: Callback<T>): Modifiers<T> {
        this.onClick = callback
        return this
    }

    addOnMousePressed(callback: Callback<T>): Modifiers<T> {
        this.onMousePressed = callback
        console.log(this.onMousePressed)
        return this
    }

    addOnMouseReleased(callback: Callback<T>): Modifiers<T> {
        this.onMouseReleased = callback
        return this
    }

    addZIndex(zIndex: number): Modifiers<T> {
        this.zIndex = zIndex
        return this
    }
}