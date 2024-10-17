import P5 from 'p5';

export interface Clickable {
    // Check if the given cursor position is within the boundaries of the object
    mouseClicked(p: P5, pos: P5.Vector): boolean;
    mousePressed(p: P5, pos: P5.Vector): void;
    mouseReleased(p: P5, pos: P5.Vector): void;
}
