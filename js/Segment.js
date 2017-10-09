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

    measureOrientation(point) {
        const angle = this.end.measureAngle(this.start)
        /*console.log('START');
        console.log('angle:');
        console.log(angle);
        console.log('segment:');
        console.log(JSON.stringify(this));
        console.log('point:');
        console.log(JSON.stringify(point));
        console.log('translate:');
        console.log(JSON.stringify(point.translate(this.start.negate())));
        console.log('rotate:');
        console.log(JSON.stringify(point.translate(this.start.negate()).rotate(-angle)));
        console.log('y:');
        console.log(point.translate(this.start.negate()).rotate(-angle).y);
        console.log('end point after rotation:');
        console.log(JSON.stringify(this.end.translate(this.start.negate()).rotate(-angle)));*/
        return Math.sign(point.translate(this.start.negate()).rotate(-angle).y)
    }

    intersect(other) {
        const thisStart = other.measureOrientation(this.start)
        const thisEnd = other.measureOrientation(this.end)
        const otherStart = this.measureOrientation(other.start)
        const otherEnd = this.measureOrientation(other.end)

        if (thisStart != 0 && thisEnd != 0) {
            if (thisStart == thisEnd) return false
        }

        if (otherStart != 0 && otherEnd != 0) {
            if (otherStart == otherEnd) return false
        }

        console.log('COLLIDE:');
        console.log(this);
        console.log(other);

        return true
    }
}
