"use strict";

console.log('LOAD — point.js');

class Point {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    negate() {
        return new Point(-this.x, -this.y)
    }

    translate(vector = new Point(0, 0)) {
        return new Point(this.x + vector.x, this.y + vector.y)
    }

    rotate(angle, center = new Point(0, 0)) {
        return this.translate(center.negate()).rotateAroundOrigin(angle).translate(center)
    }

    rotateAroundOrigin(angle) {
        const x = this.x * Math.cos(angle) - this.y * Math.sin(angle)
        const y = this.y * Math.cos(angle) + this.x * Math.sin(angle)
        return new Point(x, y)
    }

    measureAngle(center = new Point(0, 0)) {
        return this.translate(center.negate()).measureAngleFromOrigin()
    }

    measureAngleFromOrigin() {
        return Math.atan2(this.y, this.x)
    }
}
