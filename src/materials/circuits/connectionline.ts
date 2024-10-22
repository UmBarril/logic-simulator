import P5 from "p5";
import { Material } from "../interfaces/material";
import { Modifiers } from "../modifiers";
import { ConnectionPoint, PointType } from "./connectionpoint";
import { disabledColor, enabledColor } from "./colors";

export class ConnectionLine extends Material {

    private readonly width = 10

    constructor(
        private io1: ConnectionPoint,
        private io2: ConnectionPoint,
        modifiers: Modifiers<ConnectionLine> = new Modifiers()
    ) { 
        super(
            new P5.Vector(0,0,1),
            modifiers.addOnClick((self, pos) => {
                console.log("clicked on line")
                // this.color = p.color(p.random(255), p.random(255), p.random(255))
                return true;
            })
        )
    }

    getIo1(): ConnectionPoint {
        return this.io1
    }

    setIo1(io1: ConnectionPoint) {
        this.io1 = io1
    }

    getIo2(): ConnectionPoint {
        return this.io2
    }

    setIo2(io2: ConnectionPoint) {
        this.io2 = io2
    }

    draw(p: P5): void {
        p.push()
            // p.scale(this.getScale())
            p.translate(0,0,this.realPos.z)

            if (this.io1.getValue()) {
                p.stroke(p.color(enabledColor))
            } else {
                p.stroke(p.color(disabledColor))
            }
            p.strokeWeight(this.width * this.getScale())

            let io1Pos = this.scaleVector(this.io1.getConnectionPointPosition())
            let io2Pos = this.scaleVector(this.io2.getConnectionPointPosition())
            p.line(io2Pos.x, io2Pos.y, io1Pos.x, io1Pos.y)
        p.pop()
    }


    isInside(pos: P5.Vector): boolean {
        let start = this.io2.getConnectionPointPosition()
        let end = this.io1.getConnectionPointPosition()
        let dist = this.pointToLineDistance(start, end, pos)

        return dist < this.width / 2
    }

    pointToLineDistance(A: P5.Vector, B: P5.Vector, P: P5.Vector): number {
        // Vector from A to B
        let AB = P5.Vector.sub(B, A);
        
        // Vector from A to P
        let AP = P5.Vector.sub(P, A);
        
        // Project vector AP onto AB and get the projection length
        let projectionLength = AP.dot(AB) / AB.mag();
        
        // Ensure projectionLength is clamped to the length of the segment
        projectionLength = Math.max(0, Math.min(projectionLength, AB.mag()));
        
        // Find the closest point on the line segment to P
        let closestPoint = P5.Vector.add(A, AB.setMag(projectionLength));
        
        // Return the distance from P to the closest point on the line segment
        return P5.Vector.dist(P, closestPoint);
    }
}