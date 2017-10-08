"use strict";

console.log('LOAD — path.js')

class Path {
    constructor(points) {
        const listOfPoints = []
        points.forEach(function(point) {
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
        context.strokeStyle = '#f00'
        context.stroke()
    }

    getSegments() {
        const segments = []
        for (let i = 1; i < this.points.length; i++) {
            segments.push(Segment(this.points[i - 1], this.points[i]))
        }
        return segments
    }
}
