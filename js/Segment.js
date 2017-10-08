"use strict";

console.log('LOAD — segment.js')
class Segment {
    constructor(arg1, arg2, arg3, arg4) {
        switch (arguments.length) {
            case 2:
                [arg1, arg2].forEach(arg => {
                    if (!(arg instanceof Point)) throw Error
                })
                this.start = arg1
                this.end = arg2
                break

            case 4:
                [arg1, arg2, arg3, arg4].forEach(arg => {
                    if (typeof arg !== 'number') throw Error
                })
                this.start = new Point(arg1, arg2)
                this.end = new Point(arg3, arg4)
        }
    }

    intersect(segment) {
        return false
    }

    measureOrientation(point) {
        if (this.start.y == this.end.y) {
            const rotatedStart = start.rotate(Math.PI / 2)
            const rotatedEnd = end.rotate(Math.PI / 2)
            const rotatedSegment = Segment(rotatedSegment, rotatedEnd)
            return rotatedSegment.measureOrientation(point.rotate(Math.PI / 2))
        }

        const angle = this.start.measureAngle(this.end)
        return point.translate(this.end.negate()).rotate(angle).x
    }
}
