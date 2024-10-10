
export interface Collidable {
    // Check if the given object is within the boundaries of the object
    checkBoundaries(x: number, y: number): boolean;
}