"use strict";

console.log('LOAD — car.js')

class Car {
    constructor(x = 0, y = 0) {
        this.start = new Point(x, y)
        this.location = new Point(x, y)
        this.maxDistanceFromStart = 0
        this.width = 50
        this.height = 30
        this.angle = 0
        this.speed = Math.random() * 0.2 + 0.9
        this.steer = Math.random() * 0.05 - 0.025
        this.totalDistance = 0
        this.color = '#440'
        this.working = true
        this.brain = new Brain(5, 4, 3, 2)
    }

    static findBest(cars) {
        return cars.reduce((a, b) => {
            if (!a.working) {
                return b
            }
            if (!b.working) {
                return a
            }
            return a.getFitness() > b.getFitness() ? a : b
        }, cars[0])
    }

    clone() {
        const clone = new Car()
        clone.start = this.start
        clone.brain = this.brain
        return clone
    }

    getFitness() {
        return 0.01 * this.totalDistance + this.maxDistanceFromStart
    }

    move() {
        if (this.working) {
            this.angle += this.steer
            this.location.x += Math.cos(this.angle) * this.speed
            this.location.y += Math.sin(this.angle) * this.speed
            this.totalDistance += this.speed
            this.maxDistanceFromStart = Math.max(this.maxDistanceFromStart, this.location.getDistance(this.start))
        }
    }

    draw(context) {
        context.fillStyle = this.color
        context.strokeStyle = '#222'
        context.lineWidth = 2
        context.save()
        context.translate(this.location.x, this.location.y)
        context.rotate(this.angle)

        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        context.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height)

        context.restore()
        this.drawBeam(context, this.beamCenter)
        this.drawBeam(context, this.beamRight)
        this.drawBeam(context, this.beamFarRight)
        this.drawBeam(context, this.beamLeft)
        this.drawBeam(context, this.beamFarLeft)
    }

    drawBeam(context, beam) {
        context.beginPath()
        context.moveTo(beam.start.x, beam.start.y)
        context.lineTo(beam.end.x, beam.end.y)
        context.strokeStyle = '#aaf'
        context.stroke()
    }

    getCorners() {
        const corners = []
        const distance = Math.sqrt(this.width * this.width + this.height * this.height) / 2
        const angle = Math.atan(this.height / this.width)

        corners.push(new Point(this.location.x + Math.cos(angle + this.angle) * distance, this.location.y - Math.sin(angle + this.angle) * distance))

        corners.push(new Point(this.location.x + Math.cos(-angle + this.angle) * distance, this.location.y - Math.sin(-angle + this.angle) * distance))

        corners.push(new Point(this.location.x + Math.cos(Math.PI + angle + this.angle) * distance, this.location.y - Math.sin(Math.PI + angle + this.angle) * distance))

        corners.push(new Point(this.location.x + Math.cos(Math.PI - angle + this.angle) * distance, this.location.y - Math.sin(Math.PI - angle + this.angle) * distance))

        return corners
    }

    getSegments() {
        const segments = []

        const corners = this.getCorners()
        for (let i = 1; i < corners.length; i++) {
            segments.push(new Segment(corners[i - 1], corners[i]))
        }
        segments.push(new Segment(corners[corners.length - 1], corners[0]))
        return segments
    }

    collide(paths) {
        let collision = false
        Path.getAllSegments(paths).forEach(wall => {
            this.getSegments().forEach(side => {
                if (side.intersect(wall) !== null) collision = true
            })
        })
        return collision
    }

    useCaptors(paths) {
        const maxDistance = 200

        this.beamFarLeft = this.calculateBeam(-Math.PI / 4, paths, maxDistance)
        this.beamLeft = this.calculateBeam(-Math.PI / 8, paths, maxDistance)
        this.beamCenter = this.calculateBeam(0, paths, maxDistance)
        this.beamRight = this.calculateBeam(Math.PI / 8, paths, maxDistance)
        this.beamFarRight = this.calculateBeam(Math.PI / 4, paths, maxDistance)
    }

    calculateBeam(angle, paths, maxDistance) {
        const target = new Point(maxDistance, 0).rotate(this.angle + angle).translate(this.location)

        let shortSegment = new Segment(this.location.x, this.location.y, target.x, target.y)

        const that = this

        Path.getAllSegments(paths).forEach(function(segment) {
            const intersection = shortSegment.intersect(segment)
            if (intersection != null) {
                shortSegment = new Segment(that.location.x, that.location.y, intersection.x, intersection.y)
            }
        })

        return shortSegment
    }

    useBrain() {
        let data =
            this.brain.evaluate(
                this.beamFarLeft.getLength(),
                this.beamLeft.getLength(),
                this.beamCenter.getLength(),
                this.beamRight.getLength(),
                this.beamFarRight.getLength())

        this.speed = Util.map(data[0], [0, 1], [-2, 2])
        this.steer = Util.map(data[1], [0, 1], [-0.05, 0.05])
    }

    mate(other) {
        const child = new Car()
        child.brain = this.brain.mate(other.brain)
        return child
    }
}
