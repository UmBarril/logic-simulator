import P5 from "p5"
import { Material } from "./interfaces/material";

type Callback<T> = ((m: T, pos: P5.Vector) => boolean) | null

export class Modifiers<T extends Material> {

    // converter para isso?
    //  https://stackoverflow.com/questions/21969248/javascript-unpack-object-as-function-parameters
    // constructor(
    //     {
    //         onClick: Callback<T> = null,
    //         onMousePressed: Callback<T> = null,
    //         onMouseReleased: Callback<T> = null,
    //     }
    // ){
    constructor(
        public onClick: Callback<T> = null,
        public onMousePressed: Callback<T> = null,
        public onMouseReleased: Callback<T> = null,
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
        return this
    }

    addOnMouseReleased(callback: Callback<T>): Modifiers<T> {
        this.onMouseReleased = callback
        return this
    }
}