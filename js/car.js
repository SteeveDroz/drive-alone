"use strict";

console.log('LOAD — car.js')

const createCar = function() {
    return {
        x: 0,
        y: 0,
        width: 50,
        height: 30,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 0.2 + 0.9,
        steer: Math.random() * 0.05 - 0.025,
        fitness: 0,
        color: '#440',
        working: true,
        move: function() {
            if (this.working) {
                this.angle += this.steer
                this.x += Math.cos(this.angle) * this.speed
                this.y -= Math.sin(this.angle) * this.speed
                this.fitness += this.speed
            }
        },
        draw: function(context) {
            context.fillStyle = this.color
            context.strokeStyle = '#222'
            context.save()
            context.translate(this.x, this.y)
            context.rotate(-this.angle)
            context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
            context.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height)
            context.restore()
        },
        getCorners: function() {
            const corners = []
            const distance = Math.sqrt(this.width * this.width + this.height * this.height) / 2
            const angle = Math.atan(this.height / this.width)
            corners.push({
                x: this.x + Math.cos(angle + this.angle) * distance,
                y: this.y - Math.sin(angle + this.angle) * distance
            }, {
                x: this.x + Math.cos(-angle + this.angle) * distance,
                y: this.y - Math.sin(-angle + this.angle) * distance
            }, {
                x: this.x + Math.cos(Math.PI + angle + this.angle) * distance,
                y: this.y - Math.sin(Math.PI + angle + this.angle) * distance
            }, {
                x: this.x + Math.cos(Math.PI - angle + this.angle) * distance,
                y: this.y - Math.sin(Math.PI - angle + this.angle) * distance
            })

            return corners
        },
        getSegments: function() {
            const corners = getCorners()
        },
        collideWith: function(path) {}
    }
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
