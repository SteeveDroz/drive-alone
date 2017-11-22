"use strict";

console.log('LOAD — car.js')

class Car {
    constructor(checkpoints, x = 0, y = 0) {
        this.checkpoints = checkpoints
        this.start = new Point(x, y)
        this.location = new Point(x, y)
        this.countdown = 500
        this.maxFitness = 0
        this.lastCheckpoint = 0
        this.totalTime = 0
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
            return Car.compare(a, b) > 0 ? a : b
        }, cars[0])
    }

    static compare(a, b) {
        if (a.getFitness() == Infinity && b.getFitness() == Infinity) {
            return -(a.totalTime - b.totalTime)
        }
        return a.getFitness() - b.getFitness()
    }

    load(data) {
        this.brain = new Brain(...data.layers)
        for (let layerId = 1; layerId < data.neurons.length; layerId++) {
            for (let neuronId = 0; neuronId < data.neurons[layerId].length; neuronId++) {
                const neuronData = data.neurons[layerId][neuronId]
                const neuron = this.brain.neurons[layerId][neuronId]
                for (let dataInputId = 0; dataInputId < neuronData.inputs.length; dataInputId++) {
                    const dataInput = neuronData.inputs[dataInputId]
                    for (let inputId = 0; inputId < neuron.inputs.length; inputId++) {
                        const input = neuron.inputs[inputId]
                        if (input.source.name === dataInput.source.name) {
                            input.weight = dataInput.weight
                        }
                    }
                }
                neuron.bias = neuronData.bias
            }
        }
    }

    clone() {
        const clone = new Car(this.checkpoints)
        clone.start = this.start
        clone.brain = this.brain
        return clone
    }

    getFitness() {
        if (this.lastCheckpoint >= this.checkpoints.length - 1) {
            return Infinity
        }
        return 1000 * (this.lastCheckpoint + 1) - this.getDistanceToRelativeCheckpoint(1)
    }

    move() {
        if (this.working) {
            this.angle += this.steer
            this.location.x += Math.cos(this.angle) * this.speed
            this.location.y += Math.sin(this.angle) * this.speed
            this.totalDistance += this.speed
            this.maxDistanceFromStart = Math.max(this.maxDistanceFromStart, this.location.getDistance(this.start))

            if (this.getFitness() < this.maxFitness + 100) {
                if (--this.countdown < 0) {
                    this.working = false
                }
            } else {
                this.maxFitness = this.getFitness()
                this.countdown = 200
            }

            if (this.lastCheckpoint < this.checkpoints.length - 1) {
                if (this.getDistanceToRelativeCheckpoint(1) < this.getDistanceToRelativeCheckpoint(0)) {
                    this.lastCheckpoint += 1
                }
            }
            if (this.getFitness() < Infinity) {
                this.totalTime++
            }
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

        if (this.keptFromLastGeneration) {
            context.save()
            context.translate(this.location.x, this.location.y)
            context.rotate(this.angle)
            context.fillStyle = '#000'
            context.fillRect(-2, -2, 4, 4)
            context.restore()
        }
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

        corners.push(new Point(this.location.x + Math.cos(angle + this.angle) * distance, this.location.y + Math.sin(angle + this.angle) * distance))

        corners.push(new Point(this.location.x + Math.cos(-angle + this.angle) * distance, this.location.y + Math.sin(-angle + this.angle) * distance))

        corners.push(new Point(this.location.x + Math.cos(Math.PI + angle + this.angle) * distance, this.location.y + Math.sin(Math.PI + angle + this.angle) * distance))

        corners.push(new Point(this.location.x + Math.cos(Math.PI - angle + this.angle) * distance, this.location.y + Math.sin(Math.PI - angle + this.angle) * distance))

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

    getDistanceToRelativeCheckpoint(n) {
        return this.location.getDistance(this.checkpoints[this.lastCheckpoint + n])
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

        this.speed = Util.map(data[0], [0, 1], [-2, 3])
        this.steer = Util.map(data[1], [0, 1], [-0.05, 0.05])
    }

    createNextGeneration(size = 10) {
        const nextGeneration = []
        for (let i = 0; i < size; i++) {
            const modifiedBrain = this.brain.createAlteration()
            const car = new Car(this.checkpoints)
            car.brain = modifiedBrain
            nextGeneration.push(car)
        }
        return nextGeneration
    }
}
