"use strict";

console.log('LOAD — path.js')

class Path {
    constructor(points) {
        const listOfPoints = []
        points.forEach(function(point) {
            if (point.length != 2) throw Error()
            point.forEach(function(coordinate) {
                if (typeof coordinate !== 'number') throw Error()
            })
            listOfPoints.push(new Point(...point))
        })
        this.points = listOfPoints
    }

    draw(context) {
        context.beginPath()
        context.moveTo(this.points[0].x, this.points[0].y)
        for (let i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y)
        }
        context.strokeStyle = '#000'
        context.stroke()
    }

    getSegments() {
        const segments = []
        for (let i = 1; i < this.points.length; i++) {
            segments.push(new Segment(this.points[i - 1], this.points[i]))
        }
        return segments
    }
}
