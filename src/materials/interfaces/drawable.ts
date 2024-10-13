import P5 from 'p5';

export interface Drawable {
    draw(p: P5): void;
}