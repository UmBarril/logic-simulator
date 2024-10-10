import p5 from 'p5';

export interface Updatable {
    update(p: p5): void;
}