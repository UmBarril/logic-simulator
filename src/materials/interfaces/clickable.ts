import P5 from 'p5';

export interface Clickable {
    // Check if the given cursor position is within the boundaries of the object
    click(p: P5, pos: P5.Vector): boolean;
    pressed(p: P5, pos: P5.Vector): void;
    released(p: P5, pos: P5.Vector): void;
}
