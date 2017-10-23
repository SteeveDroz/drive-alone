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

    multiply(factor) {
        return new Point(this.x * factor, this.y * factor)
    }

    getMiddle(other, percentage = 0.5) {
        return new Point((1 - percentage) * this.x + percentage * other.x, (1 - percentage) * this.y + percentage * other.y)
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

    getVector(other) {
        return new Point(other.x - this.x, other.y - this.y)
    }

    getDistance(other = new Point(0, 0)) {
        return Math.sqrt((other.x - this.x) * (other.x - this.x) + (other.y - this.y) * (other.y - this.y))
    }

    getNormalizedVector(other) {
        const vector = this.getVector(other)
        const distance = this.getDistance(other)
        if (distance == 0) {
            return new Point(0, 0)
        }
        return vector.multiply(1 / distance)
    }

    getVectorOfLength(length) {
        if (this.getDistance() == 0) {
            return this
        }
        return this.multiply(length / this.getDistance())
    }
}
