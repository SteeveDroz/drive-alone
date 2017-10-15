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

    getLength() {
        return this.end.getDistance(this.start)
    }

    measureOrientation(point) {
        const angle = this.end.measureAngle(this.start)
        return Math.sign(point.translate(this.start.negate()).rotate(-angle).y)
    }

    intersect(other) {
        const thisStart = other.measureOrientation(this.start)
        const thisEnd = other.measureOrientation(this.end)
        const otherStart = this.measureOrientation(other.start)
        const otherEnd = this.measureOrientation(other.end)

        if (thisStart != 0 && thisEnd != 0) {
            if (thisStart == thisEnd) return null
        }

        if (otherStart != 0 && otherEnd != 0) {
            if (otherStart == otherEnd) return null
        }

        const x = ((this.start.x * this.end.y - this.start.y * this.end.x) * (other.start.x - other.end.x) - (this.start.x - this.end.x) * (other.start.x * other.end.y - other.start.y * other.end.x)) / ((this.start.x - this.end.x) * (other.start.y - other.end.y) - (this.start.y - this.end.y) * (other.start.x - other.end.x))

        const y = ((this.start.x * this.end.y - this.start.y * this.end.x) * (other.start.y - other.end.y) - (this.start.y - this.end.y) * (other.start.x * other.end.y - other.start.y * other.end.x)) / ((this.start.x - this.end.x) * (other.start.y - other.end.y) - (this.start.y - this.end.y) * (other.start.x - other.end.x))
        return new Point(x, y)
    }
}
