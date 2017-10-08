"use strict";

console.log('LOAD — car.js')

class Car {
    constructor() {
        this.location = new Point(0, 0)
        this.width = 50
        this.height = 30
        this.angle = Math.random() * 2 * Math.PI
        this.speed = Math.random() * 0.2 + 0.9
        this.steer = Math.random() * 0.05 - 0.025
        this.fitness = 0
        this.color = '#440'
        this.working = true
    }

    move() {
        if (this.working) {
            this.angle += this.steer
            this.location.x += Math.cos(this.angle) * this.speed
            this.location.y -= Math.sin(this.angle) * this.speed
            this.fitness += this.speed
        }
    }

    draw(context) {
        context.fillStyle = this.color
        context.strokeStyle = '#222'
        context.save()
        context.translate(this.location.x, this.location.y)
        context.rotate(-this.angle)
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        context.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height)
        context.restore()
    }

    getCorners() {
        const corners = []
        const distance = Math.sqrt(this.width * this.width + this.height * this.height) / 2
        const angle = Math.atan(this.height / this.width)
        corners.push(Point(this.location.x + Math.cos(angle + this.angle) * distance, this.location.y - Math.sin(angle + this.angle) * distance))
        corners.push(Point(this.location.x + Math.cos(-angle + this.angle) * distance, this.location.y - Math.sin(-angle + this.angle) * distance))
        corners.push(Point(this.location.x + Math.cos(Math.PI + angle + this.angle) * distance, this.location.y - Math.sin(Math.PI + angle + this.angle) * distance))
        corners.push(Point(this.location.x + Math.cos(Math.PI - angle + this.angle) * distance, this.location.y - Math.sin(Math.PI - angle + this.angle) * distance))

        return corners
    }

    getSegments() {
        const segments = []

        const corners = getCorners()
        for (let i = 1; i < corners.length; i++) {
            segments.push(Segment(corners[i - 1], corners[i]))
        }
        return segments
    }

    collideWith(path) {}
}

const getBest = function(cars) {
    return cars.reduce((a, b) => {
        if (!a.working) {
            return b
        }
        if (!b.working) {
            return a
        }
        return a.fitness > b.fitness ? a : b
    }, cars[0])
}
