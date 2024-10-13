import P5 from 'p5';

export interface KeyboardListener {
    keyPressed(p: P5, key: string): void;
    keyReleased(p: P5, key: string): void;
}