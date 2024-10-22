import { ConnectionPoint, PointType } from "./connectionpoint";

export interface OutputConnectionPoint extends ConnectionPoint {
    discriminator: 'OUTPUT'
}

export function isOutputConnectionPoint(object: any): object is OutputConnectionPoint {
    return object.discriminator === 'OUTPUT';
}