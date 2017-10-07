"use strict";

console.log('LOAD — point.js');

const Point = function(x, y) {
    return {
        x: x,
        y: y,
        negate: function() {
            return Point(-this.x, -this.y)
        },
        translate: function(vector = Point(0, 0)) {
            return Point(this.x + vector.x, this.y + vector.y)
        },
        rotate: function(angle, center = Point(0, 0)) {
            return this.translate(center.negate()).rotateAroundOrigin(angle).translate(center)
        },
        rotateAroundOrigin: function(angle) {
            const x = this.x * Math.cos(angle) - this.y * Math.sin(angle)
            const y = this.y * Math.cos(angle) + this.x * Math.sin(angle)
            return Point(x, y)
        },
        measureAngle: function(center = Point(0, 0)) {
            return this.translate(center.negate()).measureAngleFromOrigin()
        },
        measureAngleFromOrigin: function() {
            return Math.atan2(this.y, this.x)
        }
    }
}
