import P5 from 'p5';
import { Material } from './material';

export interface KeyboardListener {
    keyPressed(p: P5, key: string): void;
    keyReleased(p: P5, key: string): void;
}

// todo: talvez achar uma melhor maneira de resolver isso
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
function isKeyboardListener(m: Material | KeyboardListener): m is KeyboardListener {
    return (m as KeyboardListener).keyPressed !== undefined
}