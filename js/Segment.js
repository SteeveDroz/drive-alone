"use strict";

console.log('LOAD — segment.js')

const Segment = function(start, end) {
    return {
        start: start,
        end: end,
        intersect: function(other) {

        },
        measureOrientation: function(point) {
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
}
