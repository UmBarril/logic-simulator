import { ConnectionPoint, PointType } from "./connectionpoint";

export interface InputConnectionPoint extends ConnectionPoint{
    discriminator: 'INPUT'
}

export function isInputConnectionPoint(object: any): object is InputConnectionPoint {
     return object.discriminator === 'INPUT';
}